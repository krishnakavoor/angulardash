import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AjaxConfigService {
  protected requestInProgress = 0;

  private baseURL = '';
  private urlConfiguration = {

    sampleRequest: {
      endPointUrl: '/path',
      static: '',
      method: 'GET',
      isProtected: false
    }
  };

  constructor() {}

  protected getURL(requestId: string): string {
    return (
        `${this.baseURL}${this.urlConfiguration[requestId].endPointUrl}`
    );
  }

  /* @name AjaxConfigService#getMethod
   * @methodOf AjaxConfigService
   * @description Used to get the method for Ajax request
   */
  protected getMethod(requestId: string): string {
    return this.urlConfiguration[requestId].endPointUrl === ''
      ? 'GET'
      : this.urlConfiguration[requestId].method;
  }
  /* @name AjaxConfigService#getContentType
   * @methodOf AjaxConfigService
   * @description Used to get content type
   */
  private getContentType(requestId: string): string {
    return 'application/json';
  }

  /* @name AjaxConfigService#getHeader
   * @methodOf AjaxConfigService
   * @description Used to get web service header
   */
  protected getHeader(requestId: string): any {
    const headers = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Content-Type', this.getContentType(requestId));
    return headers;
  }
  isRequestInprogress() {
    return this.requestInProgress;
  }
}
