import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePuzzleComponent } from './choose-puzzle.component';

describe('ChoosePuzzleComponent', () => {
  let component: ChoosePuzzleComponent;
  let fixture: ComponentFixture<ChoosePuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePuzzleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
