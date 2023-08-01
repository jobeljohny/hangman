import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { isAlphaNum } from 'src/app/Classes/common';
import { KeyStates } from 'src/app/Classes/key-states';
import { Status } from 'src/app/Models/Status.model';
import { GameConfig, GameStatus, Result, Vals } from 'src/app/enums/config';
import { GameRoundService } from 'src/app/services/game-round.service';
import { GameSessionService } from 'src/app/services/game-session.service';
import { GameStateService } from 'src/app/services/game-state.service';
import { GameTimerService } from 'src/app/services/game-timer.service';
import { AuthService } from '../../services/auth.service';
import { ResultModalComponent } from './result-modal/result-modal.component';

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
    private session: GameSessionService
  ) {}

  ngOnInit(): void {
    this.setGameMode();
    this.timer.setTimeOutFn(this.assignLost.bind(this));
    this.initialize();
    this.loadKeypadToggleState();
  }

  setGameMode() {
    this.isCompetitive = this.auth.isLoggedIn();

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
    return this.gameRound.isNumberPresent;
  }

  async initialize() {
    if (this.isCompetitive) {
      await this.session.initSession();
      await this.session.initializeGameRound();
      this.gameRound.initializeCompetitive(this.session.Round);
      this.gameState.setData(this.session.Round);
      this.timer.start();
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

  async handleKeyClick(key: string) {
    if (this.isCompetitive) await this.processCompetitive(key);
    else this.process(key);
  }

  async processCompetitive(key: string) {
    this.gameRound.keyMap.disableKey(key);
    if (this.session.sessionInitialized && this.session.isRoundLive) {
      let res = await this.session.validateKey(key);
      this.handleValidationResult(res);
    }
  }

  handleValidationResult(status: Status) {
    switch (status.flag) {
      case GameStatus.CORRECT_GUESS:
        this.session.updateTemplate(status.template);
        this.blink('GUESSER', Vals.CORRECT);
        this.setPanelMsg(Vals.CORRECT_MSG, this.session.pressedKey);
        break;
      case GameStatus.INCORRECT_GUESS:
        this.session.pushError();
        this.blink('GUESSER', Vals.ERROR);
        this.setPanelMsg(Vals.INCORRECT_MSG, this.session.pressedKey);
        break;
      case GameStatus.ALREADY_ERROR_BUFF:
        this.blink('ERROR_BUFFER', Vals.ERROR);
        this.setPanelMsg(Vals.ERRORLIST_MSG, this.session.pressedKey);
        break;
      case GameStatus.LOST:
      case GameStatus.TIMEOUT:
        this.timer.stop();
        this.showModal(status);
        this.session.reset();
        break;
      case GameStatus.WON:
        this.session.isRoundLive = false;
        this.timer.stop();
        this.showModal(status);
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

  async assignLost() {
    if (!this.isCompetitive) {
      this.timer.stop();
      this.round.LOST = true;
      this.showModal();
      this.gameState.reset();
    } else {
      let res = await this.session.timedOut();
      this.handleValidationResult(res);
    }
  }
  goToNextRound() {
    if (!this.isCompetitive) this.gameState.nextRound(this.timer.timeRemaining);
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
  showModal(Competive?: Status) {
    const round = Competive ? this.session.Round.round : this.gameState.Round;
    const name = Competive ? Competive.movieName : this.round.movieName;
    const isWin = Competive
      ? Competive.flag === GameStatus.WON
      : this.round.WIN;
    const score = Competive ? this.session.Round.score : this.gameState.Score;

    const dialogRef = this.dialog.open(ResultModalComponent, {
      width: '500px',
      data: {
        round,
        name,
        isWin,
        score,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.resultHandler(result); // logic to restart game later
      } else {
        this.resultHandler(isWin ? Result.PASSED : Result.FAILED);
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
