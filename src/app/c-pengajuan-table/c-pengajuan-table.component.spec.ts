import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPengajuanTableComponent } from './c-pengajuan-table.component';

describe('CPengajuanTableComponent', () => {
  let component: CPengajuanTableComponent;
  let fixture: ComponentFixture<CPengajuanTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CPengajuanTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPengajuanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
