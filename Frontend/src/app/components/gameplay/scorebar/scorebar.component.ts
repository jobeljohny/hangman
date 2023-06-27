import { Component, Input, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-scorebar',
  templateUrl: './scorebar.component.html',
  styleUrls: ['./scorebar.component.scss'],
})
export class ScorebarComponent implements OnInit {
  constructor(
    private theme: ThemeService,
    private gameState: GameStateService
  ) {}
  get isDarkMode() {
    return this.theme.isDarkMode;
  }

  get GameState() {
    return this.gameState;
  }
  ngOnInit(): void {}
}
