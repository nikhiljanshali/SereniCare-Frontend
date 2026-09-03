import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IClinicStamp } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';
import { ClinicStampUploadService } from '../../../../core/services/clinic-stamp-upload';
import Swal from 'sweetalert2';

/**
 * Interface for Doctor data in the response
 */
interface IDoctor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  dateOfJoin: string;
  [key: string]: any;
}

/**
 * Interface for Clinic Stamp record from API
 */
interface IClinicStampRecord {
  _id: string;
  doctorId: IDoctor;
  clinicId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileData?: string; // Base64 encoded file data
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

/**
 * Interface for API Response
 */
interface IClinicStampsResponse {
  message: string;
  status: boolean;
  data: IClinicStampRecord[];
}

@Component({
  selector: 'app-clinic-stamp-upload',
  standalone: false,
  templateUrl: './clinic-stamp-upload.html',
  styleUrl: './clinic-stamp-upload.css',
})
export class ClinicStampUpload implements OnInit {
  public doctorId: string = '';
  public clinicId: string = '';
  public selectedFile: File | null = null;
  public isUploading: boolean = false;
  public uploadProgress: number = 0;
  public uploadedFiles: { _id: string; name: string; size: string; status: string; imageUrl?: string }[] = [];
  public selectedImage: { url: string; name: string } | null = null;
  public zoomLevel: number = 1;
  public isImageViewerOpen: boolean = false;
  public isLoadingStamps: boolean = false;

  /**
   * Get uploaded images (files with imageUrl)
   */
  public get uploadedImages(): { name: string; size: string; status: string; imageUrl?: string }[] {
    return this.uploadedFiles.filter(f => !!f.imageUrl);
  }

  /**
   * Get uploaded images count
   */
  public get uploadedImagesCount(): number {
    return this.uploadedImages.length;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clinicStampUploadService: ClinicStampUploadService,
    private notificationServices: NotificationServices
  ) { }

  ngOnInit(): void {
    // Get doctorId and clinicId from route params
    this.activatedRoute.params.subscribe((params) => {
      this.doctorId = params['doctorId'];
      this.clinicId = params['clinicId'];
    });
    this.getClinicStampsByClinicId();
  }

  /**
   * Fetch clinic stamps by clinic ID
   */
  public getClinicStampsByClinicId(): void {
    if (!this.clinicId) {
      this.notificationServices.error('error', 'Clinic ID is missing');
      return;
    }
    this.isLoadingStamps = true;
    this.clinicStampUploadService.getClinicStampsByClinicId(this.clinicId).subscribe({
      next: (response: IClinicStampsResponse) => {
        if (response.status && response.data && Array.isArray(response.data)) {
          this.processClinicStamps(response.data);
        }
        this.isLoadingStamps = false;
      },
      error: (error) => {
        console.error('Error fetching clinic stamps:', error);
        this.isLoadingStamps = false;
        // this.notificationServices.error('error', 'Failed to fetch clinic stamps');
      }
    });
  }

  /**
   * Process clinic stamps and populate uploadedFiles array
   */
  private processClinicStamps(stamps: IClinicStampRecord[]): void {
    this.uploadedFiles = [];
    stamps.forEach((stamp) => {
      const imageUrl = this.buildImageUrl(stamp);
      this.uploadedFiles.push({
        _id: stamp._id,
        name: stamp.fileName,
        size: this.formatFileSize(stamp.fileSize),
        status: 'Uploaded',
        imageUrl: imageUrl,
      });
    });
  }

  /**
   * Build image URL for display
   */
  private buildImageUrl(stamp: IClinicStampRecord): string | undefined {
    if (!this.isImageFile(stamp.fileType)) {
      return undefined; // Not an image file
    }
    // If fileData contains base64 data
    if (stamp.fileData) {
      // Check if it's already a data URL
      if (stamp.fileData.startsWith('data:')) {
        return stamp.fileData;
      }
      // Otherwise, construct a data URL
      return `data:${stamp.fileType};base64,${stamp.fileData}`;
    }
    return undefined;
  }

  /**
   * Handle file selection from input or drag-drop
   */
  public onFileSelect(event: any): void {
    const files: File[] = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0]; // Only accept single file
    }
  }

  /**
   * Handle drag over event
   */
  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = document.getElementById('file-drop-zone');
    if (dropZone) {
      dropZone.classList.add('drag-over');
    }
  }

  /**
   * Handle drag leave event
   */
  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = document.getElementById('file-drop-zone');
    if (dropZone) {
      dropZone.classList.remove('drag-over');
    }
  }

  /**
   * Handle file drop event
   */
  public onFileDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = document.getElementById('file-drop-zone');
    if (dropZone) {
      dropZone.classList.remove('drag-over');
    }
    const files: FileList | null | undefined = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0]; // Only accept single file
    }
  }

  /**
   * Convert file to Base64
   */
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:image/png;base64, prefix to get only the base64 string
        const base64String = result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * Upload clinic stamp file
   */
  // public async uploadClinicStamp(): Promise<void> {
  //   if (!this.selectedFile) {
  //     this.notificationServices.error('error', 'Please select a file to upload');
  //     return;
  //   }

  //   if (!this.doctorId || !this.clinicId) {
  //     this.notificationServices.error('error', 'Doctor ID or Clinic ID is missing');
  //     return;
  //   }

  //   this.isUploading = true;
  //   this.uploadProgress = 0;

  //   try {
  //     // Convert file to Base64
  //     const fileBase64 = await this.fileToBase64(this.selectedFile);

  //     // Prepare data
  //     const uploadData: IClinicStamp = {
  //       clinicId: this.clinicId,
  //       doctorId: this.doctorId,
  //       fileName: this.selectedFile.name,
  //       fileType: this.selectedFile.type,
  //       fileSize: this.selectedFile.size,
  //       fileData: fileBase64,
  //     };

  //     // Simulate progress
  //     this.uploadProgress = 50;

  //     // Call service to upload
  //     this.clinicStampUploadService.uploadClinicStamp(uploadData).subscribe(
  //       (response: any) => {
  //         this.uploadProgress = 100;
  //         this.isUploading = false;
  //         const imageUrl = this.isImageFile(this.selectedFile!.name) ? fileBase64 : undefined;
  //         this.uploadedFiles.push({
  //           _id: response._id,
  //           name: this.selectedFile!.name,
  //           size: this.formatFileSize(this.selectedFile!.size),
  //           status: 'Uploaded',
  //           imageUrl: imageUrl ? `data:${this.selectedFile!.type};base64,${imageUrl}` : undefined,
  //         });
  //         this.selectedFile = null;
  //         this.notificationServices.success('success', 'Clinic Stamp uploaded successfully');
  //       },
  //       (error: any) => {
  //         console.log(error)
  //         this.isUploading = false;
  //         this.notificationServices.error('error', 'Failed to upload clinic stamp');
  //         console.error('Upload error:', error);
  //       }
  //     );
  //   } catch (error) {
  //     this.isUploading = false;
  //     this.notificationServices.error('error', 'Error processing file');
  //     console.error('File processing error:', error);
  //   }
  // }
  /**
   * Upload clinic file
   * Allows user to select Signature or Stamp as the file name
   */
  public async uploadClinicStamp(): Promise<void> {
    if (!this.selectedFile) {
      this.notificationServices.error('error', 'Please select a file to upload');
      return;
    }

    if (!this.doctorId || !this.clinicId) {
      this.notificationServices.error('error', 'Doctor ID or Clinic ID is missing');
      return;
    }

    // Ask user to select file name
    const result = await Swal.fire({
      title: 'Select File Name',
      text: 'Please select the type of file you are uploading.',
      input: 'radio',
      inputOptions: {
        Signature: 'Signature',
        Stamp: 'Stamp'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Please select Signature or Stamp';
        }
        return null;
      },
      showCancelButton: true,
      confirmButtonText: 'Continue',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    // User cancelled
    if (!result.isConfirmed || !result.value) {
      return;
    }

    // Selected file name
    const selectedFileName: string = result.value;

    this.isUploading = true;
    this.uploadProgress = 0;

    try {
      // Convert file to Base64
      const fileBase64 = await this.fileToBase64(this.selectedFile);

      // Prepare data
      const uploadData: IClinicStamp = {
        clinicId: this.clinicId,
        doctorId: this.doctorId,

        // Use selected radio button value
        fileName: selectedFileName,

        fileType: this.selectedFile.type,
        fileSize: this.selectedFile.size,
        fileData: fileBase64,
      };

      // Simulate progress
      this.uploadProgress = 50;

      // Call service to upload
      this.clinicStampUploadService.uploadClinicStamp(uploadData).subscribe(
        (response: any) => {
          this.uploadProgress = 100;
          this.isUploading = false;

          const imageUrl = this.isImageFile(this.selectedFile!.name)
            ? fileBase64
            : undefined;

          this.uploadedFiles.push({
            _id: response._id,
            name: selectedFileName,
            size: this.formatFileSize(this.selectedFile!.size),
            status: 'Uploaded',
            imageUrl: imageUrl
              ? `data:${this.selectedFile!.type};base64,${imageUrl}`
              : undefined,
          });

          this.selectedFile = null;

          this.notificationServices.success(
            'success',
            `${selectedFileName} uploaded successfully`
          );
        },
        (error: any) => {
          console.log(error);

          this.isUploading = false;

          this.notificationServices.error(
            'error',
            `Failed to upload ${selectedFileName}`
          );

          console.error('Upload error:', error);
        }
      );
    } catch (error) {
      this.isUploading = false;
      this.notificationServices.error('error', 'Error processing file');
      console.error('File processing error:', error);
    }
  }

  /**
   * Format file size for display
   */
  public formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Remove uploaded file from list
   */
  public removeFile(index: number, file: any): void {
    // console.log('Removing file:', file);
    // console.log('Removing file at index:', index);
    // this.uploadedFiles.splice(index, 1);
    this.clinicStampUploadService.deleteClinicStamp(file._id, true).subscribe({
      next: (response) => {
        this.getClinicStampsByClinicId();
      }
    });
  }

  /**
   * Clear all uploaded files
   */
  public clearAll(): void {
    this.uploadedFiles = [];
    this.selectedFile = null;
  }

  /**
   * Get file icon based on type
   */
  public getFileIcon(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'bi-file-earmark-pdf';
      case 'doc':
      case 'docx':
        return 'bi-file-earmark-word';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'bi-file-earmark-image';
      default:
        return 'bi-file-earmark';
    }
  }

  /**
   * Get file icon background color based on type
   */
  public getFileIconBg(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return '#FEE2E2';
      case 'doc':
      case 'docx':
        return '#DBEAFE';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '#DBEAFE';
      default:
        return '#F3F4F6';
    }
  }

  /**
   * Get file icon color based on type
   */
  public getFileIconColor(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return '#DC2626';
      case 'doc':
      case 'docx':
        return '#1D4ED8';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '#1D4ED8';
      default:
        return '#6B7280';
    }
  }

  public backToList(): void {
    this.router.navigate(['/layout/doctors/master/clinics'])
  }

  /**
   * Check if file is an image
   */
  public isImageFile(fileType: string): boolean {
    return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(fileType);
  }

  /**
   * Open image viewer
   */
  public openImageViewer(imageUrl: string, imageName: string): void {
    this.selectedImage = { url: imageUrl, name: imageName };
    this.isImageViewerOpen = true;
    this.zoomLevel = 1;
  }

  /**
   * Close image viewer
   */
  public closeImageViewer(): void {
    this.isImageViewerOpen = false;
    this.selectedImage = null;
    this.zoomLevel = 1;
  }

  /**
   * Zoom in
   */
  public zoomIn(): void {
    if (this.zoomLevel < 3) {
      this.zoomLevel += 0.2;
    }
  }

  /**
   * Zoom out
   */
  public zoomOut(): void {
    if (this.zoomLevel > 0.5) {
      this.zoomLevel -= 0.2;
    }
  }

  /**
   * Reset zoom
   */
  public resetZoom(): void {
    this.zoomLevel = 1;
  }

  /**
   * Handle thumbnail hover with type safety
   */
  public onThumbnailHover(event: MouseEvent, isHovering: boolean): void {
    const target = event.currentTarget as HTMLElement;
    if (target) {
      if (isHovering) {
        target.style.borderColor = 'var(--primary)';
        target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      } else {
        target.style.borderColor = 'var(--border)';
        target.style.boxShadow = 'none';
      }
    }
  }

  /**
   * Handle overlay hover with type safety
   */
  public onOverlayHover(event: MouseEvent, isHovering: boolean): void {
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.style.background = isHovering ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)';
    }
  }

  public deleteImage(file: any): void {
    console.log('Deleting image:', file);
  }
}
