import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CJenisPembActionBoxComponent } from './c-jenis-pemb-action-box.component';

describe('CJenisPembActionBoxComponent', () => {
  let component: CJenisPembActionBoxComponent;
  let fixture: ComponentFixture<CJenisPembActionBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CJenisPembActionBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CJenisPembActionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
