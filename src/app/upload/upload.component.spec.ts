import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUi } from './upload.component';

describe('UploadUi', () => {
  let component: UploadUi;
  let fixture: ComponentFixture<UploadUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
