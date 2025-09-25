import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PServersComponent } from './p-servers.component';

describe('PServersComponent', () => {
  let component: PServersComponent;
  let fixture: ComponentFixture<PServersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PServersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
