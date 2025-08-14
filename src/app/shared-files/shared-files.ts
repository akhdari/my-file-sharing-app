import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { openFile as openFileUtil } from '../utils/file-utils';

@Component({
  selector: 'app-shared-files',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './shared-files.html',
  styleUrls: ['./shared-files.css'],
})
export class SharedFilesComponent {
  shareableToken = '';
  files: string[] = [];
  errorMessage = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  loadSharedFiles() {
    this.errorMessage = '';
    this.files = [];
    this.loading = true;

    this.http
      .get<{ files: string[] }>(
        `http://localhost:5222/Uploads/shared/${this.shareableToken}`
      )
      .subscribe({
        next: (res) => {
          this.files = res.files;
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Invalid or expired link';
          this.loading = false;
        },
      });
  }

  getFileName(url: string): string {
    return url.split('/').pop() ?? url;
  }

  openFile(url: string) {
    openFileUtil(url);
  }

  downloadFile(url: string) {
    const fileName = this.getFileName(url);
    const downloadUrl = `http://localhost:5222/Uploads/download/${this.shareableToken}/${encodeURIComponent(fileName)}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  logout() {
    localStorage.removeItem('authUser');
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
