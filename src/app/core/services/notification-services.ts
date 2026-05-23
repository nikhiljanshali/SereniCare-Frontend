import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

export interface AlertOptions {
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  reverseButtons?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationServices {

  private baseOptions = {
    confirmButtonColor: '#0d9488',
    cancelButtonColor: '#f43f5e',
    background: '#f0fdf9',
    color: '#0f172a'
  };

  // =========================
  // 🔹 SUCCESS
  // =========================
  success(message: string, title = 'Success', options?: AlertOptions) {
    return this.showAlert(title, message, 'success', options);
  }

  // =========================
  // 🔹 ERROR
  // =========================
  error(message: string, title = 'Error', options?: AlertOptions) {
    return this.showAlert(title, message, 'error', {
      confirmText: 'Close',
      ...options
    });
  }

  // =========================
  // 🔹 WARNING
  // =========================
  warning(message: string, title = 'Warning', options?: AlertOptions) {
    return this.showAlert(title, message, 'warning', {
      confirmText: 'Got it',
      ...options
    });
  }

  // =========================
  // 🔹 INFO
  // =========================
  info(message: string, title = 'Info', options?: AlertOptions) {
    return this.showAlert(title, message, 'info', options);
  }

  // =========================
  // 🔹 CONFIRM
  // =========================
  confirm(message: string, title = 'Are you sure?', options?: AlertOptions) {
    return Swal.fire({
      ...this.baseOptions,
      title,
      text: message,
      icon: 'warning',

      showCancelButton: true,
      confirmButtonText: options?.confirmText || 'Yes',
      cancelButtonText: options?.cancelText || 'Cancel',

      reverseButtons: options?.reverseButtons ?? true,
      background: '#fffbeb',
      confirmButtonColor: '#f59e0b'
    });
  }

  // =========================
  // 🔹 CORE ALERT
  // =========================
  private showAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon,
    options?: AlertOptions
  ): Promise<SweetAlertResult<any>> {

    return Swal.fire({
      ...this.baseOptions,

      title,
      text,
      icon,

      position: 'center', // 👈 matches your design

      showCancelButton: options?.showCancel || false,
      confirmButtonText: options?.confirmText || 'OK',
      cancelButtonText: options?.cancelText || 'Cancel',
      reverseButtons: options?.reverseButtons || false
    });
  }

  // =========================
  // 🔹 TOAST
  // =========================
  toast(message: string, icon: SweetAlertIcon = 'success') {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title: message,
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true
    });
  }
}
