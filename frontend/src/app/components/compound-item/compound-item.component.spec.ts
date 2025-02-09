import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundItemComponent } from './compound-item.component';

describe('CompoundItemComponent', () => {
  let component: CompoundItemComponent;
  let fixture: ComponentFixture<CompoundItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
