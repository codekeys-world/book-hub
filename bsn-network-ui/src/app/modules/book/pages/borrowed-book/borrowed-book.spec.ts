import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedBook } from './borrowed-book';

describe('BorrowedBook', () => {
  let component: BorrowedBook;
  let fixture: ComponentFixture<BorrowedBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedBook],
    }).compileComponents();

    fixture = TestBed.createComponent(BorrowedBook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
