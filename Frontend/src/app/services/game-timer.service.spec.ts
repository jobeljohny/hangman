import { TestBed } from '@angular/core/testing';

import { GameTimerService } from './game-timer.service';

describe('GameTimerService', () => {
  let service: GameTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
