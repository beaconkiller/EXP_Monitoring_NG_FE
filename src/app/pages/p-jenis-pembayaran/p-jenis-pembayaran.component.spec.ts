import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PJenisPembayaranComponent } from './p-jenis-pembayaran.component';

describe('PJenisPembayaranComponent', () => {
  let component: PJenisPembayaranComponent;
  let fixture: ComponentFixture<PJenisPembayaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PJenisPembayaranComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PJenisPembayaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
