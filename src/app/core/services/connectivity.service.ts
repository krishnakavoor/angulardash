import { Injectable } from '@angular/core';
declare var window: any;

@Injectable()
export class ConnectivityService {
  constructor() { }

  isOnline(): boolean {

    return navigator.onLine;
  }

  isOffline(): boolean {
    return !navigator.onLine;
  }
}
