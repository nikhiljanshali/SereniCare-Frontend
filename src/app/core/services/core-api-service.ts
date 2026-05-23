import { DatePipe } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, map, tap, catchError, throwError } from 'rxjs';
import { ApiResponse, Options } from '../interface/coreapi.interface';
import { eMessageIcon, eMessageType, StatusFlags } from '../enum/common.enum';

@Injectable({
  providedIn: 'root',
})
export class CoreApiService {
  notify$ = new Subject<Options>();

  constructor(private http: HttpClient) { }

  // =======================
  // 🔹 GENERIC REQUEST HANDLER (Observable)
  // =======================
  private request<T>(
    request$: Observable<ApiResponse<T>>,
    notify = true,
    requestData?: any,
    withMeta = false
  ): Observable<any> {
    return request$.pipe(
      tap((resp) => {
        if (notify) this.handleResponse(resp);
      }),
      map((resp) => {
        if (withMeta) {
          return {
            request: requestData,
            response: resp,
          };
        }
        return resp;
      }),
      catchError((error) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  // =======================
  // 🔹 GET
  // =======================
  get<T>(
    url: string,
    param?: string,
    notify = true,
    withMeta = false
  ): Observable<ApiResponse<T>> {
    const finalUrl = param ? `${url}/${param}` : url;

    return this.request<T>(
      this.http.get<ApiResponse<T>>(finalUrl),
      notify,
      param,
      withMeta
    );
  }

  getData<T>(url: string, param?: string): Observable<T> {
    return this.get<T>(url, param).pipe(map((res) => res.data));
  }

  // =======================
  // 🔹 POST
  // =======================
  post<T>(
    url: string,
    body: any,
    notify = true,
    withMeta = false
  ): Observable<ApiResponse<T>> {
    return this.request<T>(
      this.http.post<ApiResponse<T>>(url, body),
      notify,
      body,
      withMeta
    );
  }

  postData<T>(url: string, body?: any): Observable<T> {
    return this.post<T>(url, body).pipe(map((res) => res.data));
  }

  // =======================
  // 🔹 PUT
  // =======================
  put<T>(
    url: string,
    body: any,
    notify = true,
    withMeta = false
  ): Observable<ApiResponse<T>> {
    return this.request<T>(
      this.http.put<ApiResponse<T>>(url, body),
      notify,
      body,
      withMeta
    );
  }

  putData<T>(url: string, body?: any): Observable<T> {
    return this.put<T>(url, body).pipe(map((res) => res.data));
  }

  // =======================
  // 🔹 DELETE (API style)
  // =======================
  delete<T>(url: string, body?: any): Observable<ApiResponse<T>> {
    return this.request<T>(
      this.http.delete<ApiResponse<T>>(url),
      true,
      body,
      false
    );
  }

  // =======================
  // 🔹 FILE UPLOAD
  // =======================
  uploadFile<T>(url: string, file: File): Observable<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.post<T>(url, formData);
  }

  uploadMultiple<T>(
    url: string,
    files: File[],
    extraData?: any
  ): Observable<ApiResponse<T>> {
    const formData = new FormData();

    files.forEach((file) => formData.append('files', file));

    if (extraData) {
      formData.append('data', JSON.stringify(extraData));
    }

    return this.post<T>(url, formData);
  }

  // =======================
  // 🔹 DOWNLOAD (still async acceptable)
  // =======================
  downloadFile(url: string, body: any, fileName = ''): void {
    this.http
      .post(url, body, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        tap((resp: HttpResponse<Blob>) => {
          const blob = resp.body!;
          const link = document.createElement('a');

          link.href = window.URL.createObjectURL(blob);
          link.download =
            fileName ||
            new DatePipe('en-US').transform(new Date(), 'ddMMyyyyHHmmss')!;

          link.click();
        }),
        catchError((error) => {
          this.handleError(error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  // =======================
  // 🔹 RESPONSE HANDLER
  // =======================
  private handleResponse<T>(resp: ApiResponse<T>) {
    if (!resp?.message) return;

    switch (resp.status) {
      case StatusFlags.Success:
        this.notify(eMessageType.Success, resp.message, eMessageIcon.Success);
        break;

      case StatusFlags.Failed:
        this.notify(eMessageType.Error, resp.message, eMessageIcon.Error);
        break;

      case StatusFlags.AlreadyExists:
      case StatusFlags.DependencyExists:
        this.notify(eMessageType.Warning, resp.message, eMessageIcon.Warning);
        break;

      default:
        this.notify(eMessageType.Info, resp.message, eMessageIcon.Info);
    }
  }

  // =======================
  // 🔹 ERROR HANDLER
  // =======================
  private handleError(error: any) {
    const message =
      error?.error?.message ||
      error?.message ||
      'Something went wrong';

    this.notify(eMessageType.Error, message, eMessageIcon.Error);
  }

  // =======================
  // 🔹 NOTIFIER
  // =======================
  private notify(type: eMessageType, message: string, icon: eMessageIcon) {
    this.notify$.next({
      key: type,
      value: message,
      icon,
    });
  }
}
