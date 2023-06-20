import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePanelComponent } from './message-panel.component';

describe('MessagePanelComponent', () => {
  let component: MessagePanelComponent;
  let fixture: ComponentFixture<MessagePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
