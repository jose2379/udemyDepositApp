import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { Store } from '../../../../node_modules/@ngrx/store';
import { Deposit } from '../deposit.model';
import * as fromDeposit from '../deposit.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit, OnDestroy {

  incomes: number;
  extract: number;

  manyIncome: number;
  manyExtract: number;

  subscriptions: Subscription = new Subscription();

  public doughnutChartLabels:string[] = ['Ingresos', 'Retiradas'];
  public doughnutChartData:number[] = [];

  constructor(  private store: Store<fromDeposit.AppState> ) { }

  ngOnInit() {
    this.subscriptions = this.store.select('deposit').subscribe(
      deposit => {
        this.countDeposit(deposit.items);
      }
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  countDeposit( items: Deposit[] ) {
    this.incomes = 0;
    this.extract = 0;

    this.manyIncome = 0;
    this.manyExtract = 0;

    items.forEach( item => {
      if( item.type === 'income') {
        this.manyIncome++;
        this.incomes += item.acount;
      } else {
        this.manyExtract++;
        this.extract += item.acount;
      }
    });

    this.doughnutChartData = [this.incomes, this.extract];
  }

}
