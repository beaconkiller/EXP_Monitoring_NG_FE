import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PApprovePengajuanComponent } from './p-approve-pengajuan.component';

describe('PApprovePengajuanComponent', () => {
  let component: PApprovePengajuanComponent;
  let fixture: ComponentFixture<PApprovePengajuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PApprovePengajuanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PApprovePengajuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
