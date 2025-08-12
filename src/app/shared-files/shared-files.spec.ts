import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFiles } from './shared-files';

describe('SharedFiles', () => {
  let component: SharedFiles;
  let fixture: ComponentFixture<SharedFiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
