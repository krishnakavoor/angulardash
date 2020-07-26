import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// TODO use a window service as a abstraction layer over global window object
declare var window: any;
@Injectable()
export class UtilityServices {
  public isPopupMsgShown = false;
  private modelAlertEvent = new Subject<any>();
  public modelAlertEventObservable = this.modelAlertEvent.asObservable();
  public modelEventCallback = new Subject<any>(); // Source
  public modelEventCallbackObservable = this.modelEventCallback.asObservable(); // Stream
  private modelAlertCloseEvent = new Subject<any>();
  public modelAlertCloseEventObservable = this.modelAlertCloseEvent.asObservable();
  private loaderStatus: Subject<boolean> = new Subject<boolean>();
  public loaderStatusObservable = this.loaderStatus.asObservable();

  constructor() { }
  /**
   * @method alertMsg
   * @description - Show the alert msg with the given title and message
   * @param - title - title of the alertmsg
   *        - message - message of the alertmsg
   *        - type    - failure|success
   */
  alertMsg(title: string, message: string, type: string) {
    const reqObj = {
      title,
      message,
      type
    };
    // iOS 11.2.5 header jumping issue
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.modelAlertEvent.next(reqObj);
    }, 0);
  }
  /**
   * @method closeMsg
   * @description - close the alert msg
   * @param - text - text needs to be sent while closing message
   */
  closeMsg(text) {
    const reqObj = {
      callbacktext: text
    };
    setTimeout(() => {
      this.modelAlertCloseEvent.next(reqObj);
    }, 0);
  }
  /**
   * @method loadSpinner
   * @description - function to show or hide the spinner
   * @param - value - based on boolean value will show or hide the spinner
   */
  loadSpinner(value: boolean): void {
    setTimeout(() => {
      this.loaderStatus.next(value);
    }, 0);
  }
}
