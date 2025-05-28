import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCekPengajuanComponent } from './p-cek-pengajuan.component';

describe('PCekPengajuanComponent', () => {
  let component: PCekPengajuanComponent;
  let fixture: ComponentFixture<PCekPengajuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PCekPengajuanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PCekPengajuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
