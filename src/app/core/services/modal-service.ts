import { Injectable, Type } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private bsModalRef: BsModalRef | undefined;
  private bootstrapModals: Map<string, any> = new Map();

  constructor(private bsModalService: BsModalService) {}

  /**
   * Open modal by ID (DOM-based modal)
   * @param modalId - The HTML id of the modal element
   */
  openModal(modalId: string) {
    const element = document.getElementById(modalId);
    if (element) {
      let modal = this.bootstrapModals.get(modalId);
      if (!modal) {
        modal = new bootstrap.Modal(element);
        this.bootstrapModals.set(modalId, modal);
      }
      modal.show();
    } else {
      console.error(`Modal with id "${modalId}" not found.`);
    }
  }

  /**
   * Close modal by ID (DOM-based modal)
   * @param modalId - The HTML id of the modal element
   */
  closeModal(modalId: string) {
    const element = document.getElementById(modalId);
    if (element) {
      const modal = bootstrap.Modal.getInstance(element);
      if (modal) {
        modal.hide();
        this.bootstrapModals.delete(modalId);
      }
    }
  }

  /**
   * Open modal with component (ngx-bootstrap based)
   * @param component - The component to display in the modal
   * @param config - Optional modal configuration
   * @returns BsModalRef for controlling the modal
   */
  openComponentModal(component: Type<any>, config?: any) {
    this.bsModalRef = this.bsModalService.show(component, config);
    return this.bsModalRef;
  }

  /**
   * Close component modal
   */
  closeComponentModal() {
    if (this.bsModalRef) {
      this.bsModalRef.hide();
      this.bsModalRef = undefined;
    }
  }

  /**
   * Open modal by ID or component name
   * @param modalIdOrComponent - Either the modal HTML id (string) or component class (Type)
   * @param config - Optional modal configuration for component modals
   */
  openModalByIdOrComponent(
    modalIdOrComponent: string | Type<any>,
    config?: any
  ): BsModalRef | undefined {
    if (typeof modalIdOrComponent === 'string') {
      this.openModal(modalIdOrComponent);
      return undefined;
    } else {
      return this.openComponentModal(modalIdOrComponent, config);
    }
  }
}
