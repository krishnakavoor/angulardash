import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AjaxServices} from '../core/services/ajaxservice.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    dashboardList = [];
    constructor(
        private router: Router,
        private ajaxreq:AjaxServices
    ) { }

    ngOnInit() {
      this.getUserList();
    }

    listTop() {
        this.router.navigate(['/home'], { queryParams: { top: 1 } });
    }
    listTrending() {
        this.router.navigate(['/home'], { queryParams: { trending: 1 } });
    }
    listTopics(event) {
        this.router.navigate(['/home'], { queryParams: { topicId: event.target.value } });
    }

    listCategory(event) {
        this.router.navigate(['/home'], { queryParams: { categoryId: event.target.value } });
    }

    getUserList() {
        this.ajaxreq.doHttpRequestGet('GET', 'https://restcountries.eu/rest/v2/all', '').subscribe((data:any) => {
          console.log(data);
          this.dashboardList = data.data;
        });
      }
}
