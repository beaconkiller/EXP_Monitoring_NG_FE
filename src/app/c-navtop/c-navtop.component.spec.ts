import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNavtopComponent } from './c-navtop.component';

describe('CNavtopComponent', () => {
  let component: CNavtopComponent;
  let fixture: ComponentFixture<CNavtopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CNavtopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CNavtopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
