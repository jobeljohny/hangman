import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorebarComponent } from './scorebar.component';

describe('ScorebarComponent', () => {
  let component: ScorebarComponent;
  let fixture: ComponentFixture<ScorebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
