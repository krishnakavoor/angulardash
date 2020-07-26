import {
    HttpClient,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of , throwError as observableThrowError } from 'rxjs';
import { catchError, map, timeoutWith } from 'rxjs/operators';
import { AjaxConfigService } from './ajaxConfig.service';
import { ConnectivityService } from './connectivity.service';
import { UtilityServices } from './utility.service';
import { ValidationService } from './validationService';
@Injectable()
export class AjaxServices extends AjaxConfigService {
    public isAuthTokenValid = false;
    private sessionId: string;
    private userId: any;
    constructor(
        private utilityService: UtilityServices,
        private http: HttpClient,
        private connectivity: ConnectivityService) {
        super();
    }
    setUserId(id) {
        this.userId = id;
    }
    getUserId() {
        return this.userId;
    }
    setSessionId(id) {
        this.sessionId = id;
    }

    attachRequestData(request: any, data: any, method: any) {
        if (method === 'GET') {
            request.params = data;
        } else {
            request.body = data;
        }
    }

    /* @name AjaxService#doHttpRequest
     * @methodOf AjaxService
     * @description expose function to make web service request other than authentication
     */
    doHttpRequest(requestId: string, data: any, cacheKey: string = '', isSpinnerNeeded: boolean = true): Observable<any> {

        let url = super.getURL(requestId);
        const method = super.getMethod(requestId);

        if (this.connectivity.isOffline()) {
            // in offline, we are allowing user to logout from the app

            // throw connection error
            this.utilityService.alertMsg('Error', 'Kindly check the network Connection', 'failure');
            return of(null);
        }

        if (isSpinnerNeeded) {
            this.requestInProgress++;
        }
        if (data && method === 'POST') {
            data = JSON.stringify(data);
        }

        const request = {
            headers: super.getHeader(requestId),

            body: null,
            observe: 'body' as any,
            params: null,
        };
        if (method === 'GET') {
            url = url.replace('${param}', data);
            if (url.indexOf('?') === -1) {
                url += '?ts=' + new Date().getTime();
            } else {
                url += '&ts=' + new Date().getTime();
            }
        }
        else {
            request.body = data;
        }
        if (isSpinnerNeeded) {// this is set to be false when the webservice request doesnt need spinner. by default it is set to true
            if (this.requestInProgress === 1) { // make sure, we call only once
                this.utilityService.loadSpinner(true);
            }
        }

        return this.http.request(method, url, request).pipe(
            timeoutWith(300000, observableThrowError(new Error('Http Timeout exceeds'))),
            map((response: any) => this.handleSuccess(response, requestId)),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
        this.utilityService.loadSpinner(false);
        this.requestInProgress = 0;
        // set the error if session is expired
        this.utilityService.alertMsg('Error', ValidationService.getValidatorErrorMessage('apiFailureErroMsg'), 'failure');
        return of(error);

    }

    private handleSuccess(data: Response, requestId: string): Observable<any> {
        if (this.requestInProgress > 0) {
            this.requestInProgress--;
        }
        let jsonResponse = null;
        try {
            jsonResponse = data.json();
        } catch (e) {
            jsonResponse = data;
        }

        if (this.requestInProgress === 0) {
            this.utilityService.loadSpinner(false);
        }
        let response = null;

        response = jsonResponse;
        return response;
    }

}
