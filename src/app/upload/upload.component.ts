import { Component } from '@angular/core';
import { UploadService } from './upload.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { openFile as openFileUtil } from '../utils/file-utils';

@Component({
  selector: 'app-uploads',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class UploadsComponent {
  uploadProgress: number | null = null;
  shareableUrl: string = '';
  skippedFiles: string[] = [];

  constructor(private uploadService: UploadService, private router: Router) {}

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      console.warn('⚠️ No files selected');
      return;
    }

    const selectedFiles = Array.from(input.files);
    console.log('📂 Selected files:', selectedFiles);

    console.log('🚀 Upload started...');
    this.uploadService.upload(selectedFiles).subscribe({
      next: (event: HttpEvent<any>) => {
        console.log('📡 HTTP Event:', event);

        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
        else if (event.type === HttpEventType.Response) {
          const body = event.body;
          console.log('✅ Upload response raw:', body);

          if (body?.shareableUrl) {
            this.shareableUrl = body.shareableUrl;
          } else {
            console.warn('⚠️ No valid shareable URL in response');
            this.shareableUrl = '';
          }

          this.skippedFiles = body?.skippedfiles || [];
          this.uploadProgress = null;
        }
      },
      error: (err: any) => {
        this.uploadProgress = null;
        console.error('❌ Upload failed', err);
      }
    });

    input.value = '';
  }
  openFile(url: string) {
    openFileUtil(url);
  }
copyLink(url: string) {
  try {
    const parts = url.split('/');
    const token = parts[parts.length - 1];

    if (token) {
      navigator.clipboard.writeText(token).then(() => {
        alert('Token copied to clipboard!');
      });
    } else {
      alert('⚠️ No token found in URL');
    }
  } catch (error) {
    console.error('Invalid URL:', url);
    alert('❌ Failed to copy token');
  }
}


  logout() {
    localStorage.removeItem('authUser');
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
