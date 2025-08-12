import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-files',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shared-files.html',
  styleUrls: ['./shared-files.css'],
})
export class SharedFilesComponent {
  shareableToken = '';
  files: string[] = [];
  errorMessage = '';
  loading = false;

  constructor(private http: HttpClient) {}

  loadSharedFiles() {
    this.errorMessage = '';
    this.files = [];
    this.loading = true;

    console.log('Loading files for token:', this.shareableToken);

    this.http
      .get<{ files: string[] }>(
        `http://localhost:5222/Uploads/shared/${this.shareableToken}`
      )
      .subscribe({
        next: (res) => {
          console.log('Files loaded:', res.files);
          this.files = res.files;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading files:', err);
          this.errorMessage = 'Invalid or expired link';
          this.loading = false;
        },
      });
  }

  getFileName(url: string): string {
    return url.split('/').pop() ?? url;
  }

  openFile(url: string) {
    window.open(url, '_blank');
  }

  downloadFile(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = this.getFileName(url);
    link.click();
  }
}
