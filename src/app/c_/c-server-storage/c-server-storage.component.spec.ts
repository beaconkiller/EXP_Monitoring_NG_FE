import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CServerStorageComponent } from './c-server-storage.component';

describe('CServerStorageComponent', () => {
  let component: CServerStorageComponent;
  let fixture: ComponentFixture<CServerStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CServerStorageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CServerStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
