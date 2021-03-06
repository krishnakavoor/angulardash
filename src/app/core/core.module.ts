import { NgModule } from '@angular/core';

// custom imports
import { ModalAlertComponent } from './commonComponents/modal/modal.alert.component';
import { SpinnerComponent } from './commonComponents/spinner/spinner.component';
import { AjaxConfigService } from './services/ajaxconfig.service';
import { AjaxServices } from './services/ajaxservice.service';
import { ConnectivityService } from './services/connectivity.service';
import { UtilityServices } from './services/utility.service';
import { ValidationService } from './services/validationService';
import { HeaderComponent } from './commonComponents/header/header.component';
import { FooterComponent } from './commonComponents/footer/footer.component';

@NgModule({
  declarations: [ModalAlertComponent, SpinnerComponent, HeaderComponent, FooterComponent],
  providers: [
    AjaxServices,
    AjaxConfigService,
    ConnectivityService,
    UtilityServices,
    ValidationService
  ],
  exports: [ModalAlertComponent, SpinnerComponent, HeaderComponent, FooterComponent],
  entryComponents: []
})
export class CoreModule { }
