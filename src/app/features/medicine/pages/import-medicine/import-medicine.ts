import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { MedicineService } from '../../../../core/services/medicine-services';

@Component({
  selector: 'app-import-medicine',
  standalone: false,
  // imports: [],
  templateUrl: './import-medicine.html',
  styleUrl: './import-medicine.css',
})
export class ImportMedicine {
  uploadedFiles: File[] = [];
  processedFiles: any[] = [];
  allowedExtensions = ['xlsx', 'xls', 'json'];
  maxFileSize = 10 * 1024 * 1024; // 10 MB
  parsedData: any[] = [];
  isDragging = false;

  constructor(
    private _medicineService: MedicineService
  ) { }

  ngOnInit(): void { }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();

    this.isDragging = false;

    if (!event.dataTransfer?.files?.length) {
      return;
    }

    this.addFiles(Array.from(event.dataTransfer.files));
  }

  addFiles(files: File[]): void {

    files.forEach(file => {

      const extension =
        file.name.split('.').pop()?.toLowerCase();

      if (
        !extension ||
        !this.allowedExtensions.includes(extension)
      ) {
        console.warn(`${file.name} is not supported`);
        return;
      }

      const exists = this.uploadedFiles.some(
        x =>
          x.name === file.name &&
          x.size === file.size
      );

      if (!exists) {
        this.uploadedFiles.push(file);
      }
    });

    console.log('Uploaded Files:', this.uploadedFiles);
  }

  handleFileSelect(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.addFiles(Array.from(input.files));

    input.value = '';
  }

  async processFiles(): Promise<void> {

    this.parsedData = [];

    if (!this.uploadedFiles.length) {
      alert('Please upload a file first');
      return;
    }

    for (const file of this.uploadedFiles) {

      const extension =
        file.name.split('.').pop()?.toLowerCase();

      if (extension === 'json') {
        await this.readJsonFile(file);
      }

      if (
        extension === 'xlsx' ||
        extension === 'xls'
      ) {
        await this.readExcelFile(file);
      }
    }

    console.log('Parsed Data', this.parsedData);
    this._medicineService.importMedicines(this.parsedData).subscribe((res) => {
      console.log(res);
    })
  }


  readJsonFile(file: File): Promise<void> {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onload = (e: any) => {

        try {

          const jsonData = JSON.parse(
            e.target.result
          );

          if (Array.isArray(jsonData)) {
            this.parsedData.push(...jsonData);
          } else {
            this.parsedData.push(jsonData);
          }

          resolve();

        } catch (error) {
          reject(error);
        }
      };

      reader.readAsText(file);
    });
  }

  readExcelFile(file: File): Promise<void> {

    return new Promise((resolve) => {

      const reader = new FileReader();

      reader.onload = (e: any) => {

        const binaryString = e.target.result;

        const workbook = XLSX.read(
          binaryString,
          {
            type: 'binary'
          }
        );

        workbook.SheetNames.forEach(sheetName => {

          const worksheet =
            workbook.Sheets[sheetName];

          const rows =
            XLSX.utils.sheet_to_json(
              worksheet,
              {
                defval: ''
              }
            );

          this.parsedData.push(...rows);
        });

        resolve();
      };

      reader.readAsBinaryString(file);
    });
  }

  clearFiles(): void {
    this.uploadedFiles = [];
    this.parsedData = [];
  }


  getFileIcon(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();

    switch (ext) {
      case 'xlsx':
      case 'xls':
        return 'bi-file-earmark-spreadsheet';

      case 'json':
        return 'bi-filetype-json';

      case 'csv':
        return 'bi-file-earmark-text';

      default:
        return 'bi-file-earmark';
    }
  }

  getFileColor(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();

    switch (ext) {
      case 'xlsx':
      case 'xls':
        return 'var(--success)';

      case 'json':
        return 'var(--primary)';

      default:
        return 'var(--text-muted)';
    }
  }

  formatBytes(bytes: number): string {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }
}

