import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPrescriptionsDetails } from '../../../../core/interface/basic.interface';
import { ModalService } from '../../../../core/services/modal-service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ClinicStampUploadService } from '../../../../core/services/clinic-stamp-upload';

@Component({
  selector: 'app-prescription-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prescription-view.html',
  styleUrl: './prescription-view.css',
})
export class PrescriptionView {

  @ViewChild('printSection') printSection!: ElementRef;

  public prescriptionDetails: IPrescriptionsDetails | null = null;
  public patientDetails: { firstName?: string; lastName?: string; patientCode?: string } | null = null;
  public doctorDetails: { firstName?: string; lastName?: string } | null = null;
  public appointmentDetails: { appointmentNumber?: string } | null = null;
  public stampImageUrl: string | null = null;
  public signImageUrl: string | null = null;

  constructor(
    public _modalService: ModalService,
    private clinicStampUploadService: ClinicStampUploadService,
  ) {
  }

  ngOnInit(): void {
    console.log('Prescription Details:', this.prescriptionDetails?.clinicId);
    this.getClinicStamp();
  }

  public getClinicStamp(): void {
    this.clinicStampUploadService.getClinicStampsByClinicId(this.prescriptionDetails?.clinicId || '').subscribe({
      next: (response) => {
        if (response.status && response.data && Array.isArray(response.data)) {
          const signature = response.data.find((item: any) => item.fileName === 'Signature');
          this.signImageUrl = signature ? this.getImageFromBase64(signature.fileData, signature.fileType) : '';
          const stamp = response.data.find((item: any) => item.fileName === 'Stamp');
          this.stampImageUrl = stamp ? this.getImageFromBase64(stamp.fileData, stamp.fileType) : '';
        }
      },
      error: (error) => {
        console.error('Error fetching clinic stamps:', error);
      }
    });
  }

  /**
 * Convert Base64 file data to an image Data URL
 */
  public getImageFromBase64(base64Data: string, fileType: string = 'image/png'): string {
    if (!base64Data) {
      return '';
    }
    // Remove existing data URI prefix if present
    const base64 = base64Data.includes(',')
      ? base64Data.split(',')[1]
      : base64Data;
    return `data:${fileType};base64,${base64}`;
  }


  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }

  public getDiagnosisTags(diagnosis: string[]): string[] {
    return diagnosis.flatMap(item =>
      item.split(',').map(d => d.trim())
    );
  }

  public generatePDF(): void {
    if (!this.prescriptionDetails || !this.printSection) {
      return;
    }

    const element = this.printSection.nativeElement;
    const fileName = `Prescription-${this.prescriptionDetails.prescriptionNumber}.pdf`;

    // Temporarily reset layout scroll containers to allow full element capture
    const originalStyle = element.style.cssText;
    const scrollContainer = element.querySelector('.vh-scroll-container') as HTMLElement | null;
    const scrollOriginalStyle = scrollContainer?.getAttribute('style') || '';

    try {
      if (scrollContainer) {
        scrollContainer.style.height = 'auto';
        scrollContainer.style.maxHeight = 'none';
        scrollContainer.style.overflow = 'visible';
      }
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';

      setTimeout(() => {
        html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        }).then((canvas) => {
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });

          const imgWidth = 190; // A4 printable width (210mm - 20mm margins)
          const pageHeight = 297; // A4 height in mm
          const margin = 10; // Top/Bottom/Left/Right margin in mm
          const printableHeight = pageHeight - margin * 2; // 277mm printable area

          // Canvas dimensions
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          // Calculate single page canvas slice height based on printable ratio
          const sliceCanvasHeight = Math.floor((printableHeight * canvasWidth) / imgWidth);
          let heightLeft = canvasHeight;
          let positionY = 0;

          while (heightLeft > 0) {
            const currentSliceHeight = Math.min(sliceCanvasHeight, heightLeft);

            // Create dynamic page chunk canvas
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvasWidth;
            pageCanvas.height = currentSliceHeight;

            const ctx = pageCanvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
              ctx.drawImage(
                canvas,
                0, positionY, canvasWidth, currentSliceHeight, // Source coords
                0, 0, canvasWidth, currentSliceHeight          // Destination coords
              );
            }

            const pageImgData = pageCanvas.toDataURL('image/png');
            const pageImgHeight = (currentSliceHeight * imgWidth) / canvasWidth;

            // Add image slice to PDF
            pdf.addImage(pageImgData, 'PNG', margin, margin, imgWidth, pageImgHeight);

            heightLeft -= currentSliceHeight;
            positionY += currentSliceHeight;

            // If there is remaining height, add a new page
            if (heightLeft > 0) {
              pdf.addPage();
            }
          }

          pdf.save(fileName);
          this.restoreStyles(element, originalStyle, scrollContainer, scrollOriginalStyle);
        }).catch((error) => {
          console.error('Error generating PDF:', error);
          this.restoreStyles(element, originalStyle, scrollContainer, scrollOriginalStyle);
        });
      }, 100);
    } catch (error) {
      console.error('Error in generatePDF:', error);
      this.restoreStyles(element, originalStyle, scrollContainer, scrollOriginalStyle);
    }
  }

  private restoreStyles(
    element: HTMLElement,
    originalStyle: string,
    scrollContainer: HTMLElement | null,
    scrollOriginalStyle: string
  ): void {
    if (scrollContainer) {
      if (scrollOriginalStyle) {
        scrollContainer.setAttribute('style', scrollOriginalStyle);
      } else {
        scrollContainer.style.height = '';
        scrollContainer.style.maxHeight = '';
        scrollContainer.style.overflow = '';
      }
    }
    element.style.cssText = originalStyle;
  }
}
