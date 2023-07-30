import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Round } from 'src/app/Classes/Round';
import { isAlphaNum } from 'src/app/Classes/common';
import { KeyStates } from 'src/app/Classes/key-states';
import { GameConfig, GameStatus, Result, Vals } from 'src/app/enums/config';
import { GameRoundService } from 'src/app/services/game-round.service';
import { GameSessionService } from 'src/app/services/game-session.service';
import { GameStateService } from 'src/app/services/game-state.service';
import { GameTimerService } from 'src/app/services/game-timer.service';
import { AuthService } from '../../services/auth.service';
import { ResultModalComponent } from './result-modal/result-modal.component';
import { Status } from 'src/app/Models/Status.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss'],
})
export class GameplayComponent implements OnInit, OnDestroy {
  pressedKey = '';
  panelMsgType = -1;
  interval: any = undefined;
  guessBlinker: string = Vals.NORMAL;
  errorBlinker: string = Vals.NORMAL;
  isKeyboardVisible: boolean = true;
  isCompetitive = false;

  constructor(
    private gameRound: GameRoundService,
    private router: Router,
    private dialog: MatDialog,
    private timer: GameTimerService,
    private gameState: GameStateService,
    private auth: AuthService,
    private session: GameSessionService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.setGameMode();
    this.timer.setTimeOutFn(this.assignLost.bind(this));
    this.initialize();
    this.loadKeypadToggleState();
  }

  setGameMode() {
    this.isCompetitive = this.auth.isLoggedIn();
    if (this.isCompetitive) {
      this.session.initSession().subscribe({
        next: (res) => {
          console.log('session initialized');

          this.toast.success('Established');
          this.session.sessionInitialized = true;
        },
        error: (err) => {
          console.error(err);
          this.session.sessionInitialized = false;
          this.toast.error('Connection Failed');
        },
      });
    }
    console.log('Competive mode:' + this.isCompetitive);
  }

  private loadKeypadToggleState() {
    if (window.innerWidth >= 576) {
      const state = localStorage.getItem('keyboardToggleState');
      this.isKeyboardVisible = state === 'true';
      if (state === null) {
        this.isKeyboardVisible = false;
      }
    }
  }
  toggleKeyboardVisibility(vilisbility: boolean) {
    this.isKeyboardVisible = vilisbility;
  }
  get round() {
    return this.gameRound.round;
  }
  get Template() {
    if (this.isCompetitive) return this.session.Round.template;
    return this.gameRound.round.template.join('');
  }

  get remainingLives() {
    if (this.isCompetitive) return GameConfig.LIVES - this.session.Round.lives;
    return GameConfig.LIVES - this.round.lives;
  }

  get WrongBuffer() {
    if (this.isCompetitive) return this.session.Round.errorBuffer;
    return this.gameRound.round.wrongBuffer.join('');
  }

  get keys(): KeyStates {
    return this.gameRound.keyMap;
  }

  get isDigitPresent() {
    if (this.isCompetitive) return this.session.Round.isNumber;
    return this.gameRound.isNumberPresent;
  }

  initialize(): void {
    if (this.isCompetitive) {
      this.session.initializeGameRound();
    } else {
      console.log('initing movie');

      this.gameRound.initialize();
      this.setPanelMsg(-1, '');
      this.timer.start();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    let key = event.key;
    if (!isAlphaNum(key)) return;
    if (this.isCompetitive) {
      this.processCompetitive(key);
    } else if (!this.round.LOST && !this.round.WIN) this.process(key);
  }

  process(key: string) {
    this.gameRound.keyMap.disableKey(key);
    if (this.round.movie.includes(key)) {
      this.blink('GUESSER', Vals.CORRECT);
      this.round.updateTemplate(key);
      this.setPanelMsg(Vals.CORRECT_MSG, key);
      this.checkWin();
    } else if (this.round.wrongBuffer.includes(key)) {
      this.blink('ERROR_BUFFER', Vals.ERROR);
      this.setPanelMsg(Vals.ERRORLIST_MSG, key);
    } else {
      this.blink('GUESSER', Vals.ERROR);
      this.round.wrongBuffer.push(key);
      this.setPanelMsg(Vals.INCORRECT_MSG, key);
      this.round.lives--;
      if (this.round.lives === 0) {
        this.assignLost();
      }
    }
  }
  processCompetitive(key: string) {
    this.gameRound.keyMap.disableKey(key);
    this.session.validateKey(key).subscribe({
      next: (res: Status) => {
        console.log(res);

        this.handleValidationResult(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  handleValidationResult(status: Status) {
    switch (status.flag) {
      case GameStatus.CORRECT_GUESS:
        this.session.updateTemplate(status.template);
        break;
      case GameStatus.INCORRECT_GUESS:
        this.session.pushError();
        break;

      default:
        break;
    }
  }

  setPanelMsg(type: any, value: string) {
    this.pressedKey = value;
    this.panelMsgType = type;
  }
  checkWin() {
    if (!this.round.template.includes('_')) {
      this.round.WIN = true;
      this.timer.stop();
      this.showModal();
    }
  }

  assignLost() {
    this.timer.stop();
    this.round.LOST = true;
    this.showModal();
    this.gameState.reset();
  }
  goToNextRound() {
    this.gameState.nextRound(this.timer.timeRemaining);
    this.initialize();
  }

  blink(entity: string, blinker: string) {
    switch (entity) {
      case 'GUESSER':
        this.guessBlinker = blinker;
        setTimeout(() => (this.guessBlinker = Vals.WHITE), Vals.BLINK_TIMER);
        break;
      case 'ERROR_BUFFER':
        this.errorBlinker = blinker;
        setTimeout(() => (this.errorBlinker = Vals.WHITE), Vals.BLINK_TIMER);
        break;
    }
  }
  showModal() {
    let dialogRef = this.dialog.open(ResultModalComponent, {
      width: '500px',
      data: {
        round: this.gameState.Round,
        name: this.round.movieName,
        isWin: this.round.WIN,
        score: this.gameState.Score,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.resultHandler(result); // logic to restart game later
      } else {
        this.resultHandler(this.round.WIN ? Result.PASSED : Result.FAILED);
      }
    });
  }
  resultHandler(result: string) {
    if (result == Result.PASSED) this.goToNextRound();
    else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.timer.stop();
    this.gameState.reset();
  }
}
