import { NgModule } from '@angular/core';

// custom imports
import { ModalAlertComponent } from './commonComponents/modal/modal.alert.component';
import { SpinnerComponent } from './commonComponents/spinner/spinner.component';
import { AjaxConfigService } from './services/ajaxConfig.service';
import { AjaxServices } from './services/AjaxService.service';
import { ConnectivityService } from './services/connectivity.service';
import { UtilityServices } from './services/utility.service';
import { ValidationService } from './services/validationService';
import {HeaderComponent} from './commonComponents/header/header.component';
import {DashboardComponent} from '../dashboard/dashboard.component';

@NgModule({
  declarations: [ModalAlertComponent, SpinnerComponent, HeaderComponent,DashboardComponent],
  providers: [
    AjaxServices,
    AjaxConfigService,
    ConnectivityService,
    UtilityServices,
    ValidationService
  ],
  exports: [ModalAlertComponent, SpinnerComponent, HeaderComponent,DashboardComponent],
  entryComponents: []
})
export class CoreModule {}
