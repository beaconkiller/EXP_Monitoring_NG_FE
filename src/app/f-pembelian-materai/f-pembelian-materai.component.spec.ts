import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FPembelianMateraiComponent } from './f-pembelian-materai.component';

describe('FPembelianMateraiComponent', () => {
  let component: FPembelianMateraiComponent;
  let fixture: ComponentFixture<FPembelianMateraiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FPembelianMateraiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FPembelianMateraiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
