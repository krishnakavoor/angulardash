import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
    constructor(
        private router: Router
    ) { }

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
}
