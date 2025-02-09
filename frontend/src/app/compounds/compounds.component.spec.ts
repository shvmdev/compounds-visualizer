import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundsComponent } from './compounds.component';

describe('CompoundsComponent', () => {
  let component: CompoundsComponent;
  let fixture: ComponentFixture<CompoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
