import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFilesComponent } from './shared-files';

describe('SharedFiles', () => {
  let component: SharedFilesComponent;
  let fixture: ComponentFixture<SharedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
