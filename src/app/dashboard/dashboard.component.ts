import { Component, OnInit } from '@angular/core';
import { DepositService } from '../deposit/deposit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor( public depositService: DepositService ) { }

  ngOnInit() {
    this.depositService.initDepositListener();
  }

}
