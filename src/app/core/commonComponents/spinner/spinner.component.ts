import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
  } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UtilityServices } from '../../services/utility.service';

@Component({
// tslint:disable-next-line:component-selector
selector: 'spinner-component',
template: `
    <ng-template #spinnerCompRef>
    <div class="modal-header spinner-header">
        <div class="loader-outer">
        <div class="spinner-border text-primary"></div>
        </div>
    </div>
    </ng-template>
`
})
export class SpinnerComponent implements OnInit, OnDestroy {
    @ViewChild('spinnerCompRef') spinnerCompref: ElementRef;

    private modaloption: NgbModalOptions = {
        backdrop: 'static',
        windowClass: 'dark-modal',
        keyboard: false
    };
    private modalSpinnerRef = null;
    private loaderstatussubscribe;
    private isSpinnerLoading = false;

    constructor(
        private utilityService: UtilityServices,
        private modalinstance: NgbModal
    ) {}

    ngOnInit() {
        this.loaderstatussubscribe = this.utilityService.loaderStatusObservable.subscribe(
        (val: boolean) => {
            if (val) {
            if (!this.isSpinnerLoading) {
                this.modalSpinnerRef = this.modalinstance.open(
                this.spinnerCompref,
                this.modaloption
                );
                this.isSpinnerLoading = true;
            }
            } else {
            this.isSpinnerLoading = false;
            try {
                if (this.modalSpinnerRef) {
                this.modalSpinnerRef.close();
                }
            } catch (e) {}
            }
        }
        );
    }

    ngOnDestroy() {
        if (this.loaderstatussubscribe) {
        this.loaderstatussubscribe.unsubscribe();
        }
    }
}
