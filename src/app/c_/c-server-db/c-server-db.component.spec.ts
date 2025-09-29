import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CServerDbComponent } from './c-server-db.component';

describe('CServerDbComponent', () => {
  let component: CServerDbComponent;
  let fixture: ComponentFixture<CServerDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CServerDbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CServerDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
