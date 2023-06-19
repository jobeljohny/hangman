import { TestBed } from '@angular/core/testing';

import { GameRoundService } from './game-round.service';

describe('GameRoundService', () => {
  let service: GameRoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameRoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
