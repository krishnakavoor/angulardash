import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';
import { UtilityServices } from '../../services/utility.service';

declare var window: any;
declare var document: any;

@Component({
  selector: 'app-alert-component',
  templateUrl: './modal.alert.component.html',
  styleUrls: ['./modal.alert.scss']
})
export class ModalAlertComponent implements OnInit, OnDestroy {
  @ViewChild('alertCompRef') alertCompref: ElementRef;

  private modaloption: NgbModalOptions = {
    backdrop: 'static',
    windowClass: 'alert-modal-popup',
    keyboard: false
  };

  private modalAlertRef;
  private modalAlertsubscribe;
  private modalAlertCloseSubscribe;
  public title;
  public inputDataVal = '';
  public message;
  public displayButtonInfos;

  constructor(
    private utilityService: UtilityServices,
    private modalinstance: NgbModal
  ) {}

  ngOnInit() {
    this.modalAlertsubscribe = this.utilityService.modelAlertEventObservable.subscribe(
      (resObj: any) => {
        this.title = resObj.title;
        this.message = resObj.message;
        this.displayButtonInfos = this.getButtonsToDisplay(resObj.type);

        this.utilityService.isPopupMsgShown = true;
        this.modalAlertRef = this.modalinstance.open(
          this.alertCompref,
          this.modaloption
        );
        this.modalAlertRef.result.then(
          (result) => {
            if (resObj.type === 'warning') {
              this.utilityService.modelEventCallback.next({
                type: resObj.type,
                result
              });
            }
            this.utilityService.isPopupMsgShown = false;
            // sometimes, ng-bootstrap dismiss modal is not closing so we are closing from HTML DOM
            this.dismissModelFromHTMLDOM();
          },
          (reason) => {
            this.utilityService.isPopupMsgShown = false;
            // sometimes, ng-bootstrap dismiss modal is not closing so we are closing from HTML DOM
            this.dismissModelFromHTMLDOM();
          }
        );
      }
    );
    this.modalAlertCloseSubscribe = this.utilityService.modelAlertCloseEventObservable.subscribe(
      (resObj: any) => {
        this.utilityService.isPopupMsgShown = false;
        try {
          if (this.modalAlertRef) {
            this.modalAlertRef.close(resObj.callbacktext);
            this.modalAlertRef.dismiss(resObj.callbacktext);
          }
        } catch (e) {}
        // sometimes, ng-bootstrap dismiss modal is not closing so we are closing from HTML DOM
        this.dismissModelFromHTMLDOM();
      }
    );
  }

  public closeModel(callbacktext) {
    this.utilityService.isPopupMsgShown = false;
    try {
      this.modalAlertRef.close(callbacktext);
      this.modalAlertRef.dismiss(callbacktext); // forcing to dismiss modal
    } catch (e) {}
    // sometimes, ng-bootstrap dismiss modal is not closing so we are closing from HTML DOM
    this.dismissModelFromHTMLDOM();
  }

  private dismissModelFromHTMLDOM() {
    if (document.getElementsByClassName('alert-modal-popup').length) {
      document.getElementsByClassName('alert-modal-popup')[0].remove();
    }
    if (document.getElementsByTagName('body').length) {
      document.getElementsByTagName('body')[0].classList.remove('modal-open');
    }
    if (document.getElementsByClassName('modal-backdrop').length) {
      document.getElementsByClassName('modal-backdrop')[0].remove();
    }
    if (document.activeElement) {
      document.activeElement.blur();
    }
  }

  ngOnDestroy() {
    if (this.modalAlertsubscribe) {
      this.modalAlertsubscribe.unsubscribe();
    }
    if (this.modalAlertCloseSubscribe) {
      this.modalAlertCloseSubscribe.unsubscribe();
    }
  }

  private getButtonsToDisplay(type): any[] {
    let buttonArr = [];
    switch (type) {
      case 'failure':
        buttonArr = [
          {
            text: 'OK',
            class: 'doneCls btn-primary',
            callbackText: 'ok'
          }
        ];
        break;
      case 'warning':
        buttonArr = [
          {
            text: 'No',
            class: 'cancelCls btn-primary',
            callbackText: 'no'
          },
          {
            text: 'Yes',
            class: 'doneCls btn-primary',
            callbackText: 'yes'
          }
        ];
    }
    return buttonArr;
  }
}
