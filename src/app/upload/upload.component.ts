import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ for *ngIf, *ngFor
import { Upload } from './upload.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true, // ✅ important if you're using standalone components
  templateUrl: './upload.component.html',
  imports: [CommonModule], // ✅ this fixes your *ngIf / *ngFor error
})
export class UploadComponent {
  uploadProgress: number | null = null;
  generatedUrls: string[] = [];

  constructor(private uploadService: Upload) { }

  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    this.uploadService.upload(formData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload complete!', event.body);
          this.uploadProgress = null;
          this.generatedUrls = event.body.urls || [];
        }
      },
      error: (err) => {
        console.error('Upload failed', err);
        this.uploadProgress = null;
      }
    });
  }

  copyLink(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy link: ', err);
    });
  }
}
