import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Round } from 'src/app/Classes/Round';
import { isAlphaNum } from 'src/app/Classes/common';
import { GameConfig, Result, Vals } from 'src/app/enums/config';
import { GameRoundService } from 'src/app/services/game-round.service';
import { GameStateService } from 'src/app/services/game-state.service';
import { GameTimerService } from 'src/app/services/game-timer.service';
import { ThemeService } from 'src/app/services/theme.service';
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

  constructor(
    private gameRound: GameRoundService,
    private router: Router,
    private theme: ThemeService,
    private dialog: MatDialog,
    private timer: GameTimerService,
    private gameState: GameStateService
  ) {}

  ngOnInit(): void {
    this.timer.setTimeOutFn(this.assignLost.bind(this));
    this.initialize();
  }
  get isDarkMode() {
    return this.theme.isDarkMode;
  }

  get round(): Round {
    return this.gameRound.round;
  }
  get Lives() {
    return GameConfig.LIVES;
  }

  initialize(): void {
    this.gameRound.initialize();
    this.setPanelMsg(-1, '');
    this.timer.start();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    let key = event.key;
    if (!isAlphaNum(key)) return;
    if (!this.round.LOST && !this.round.WIN) this.process(key);
  }

  process(key: string) {
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

  setPanelMsg(type: any, value: string) {
    this.pressedKey = value;
    this.panelMsgType = type;
  }
  checkWin() {
    if (!this.round.template.includes('-')) {
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
    this.gameState.nextRound(this.round.timeLeft);
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
