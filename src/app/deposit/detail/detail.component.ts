import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '../../../../node_modules/@ngrx/store';
import { AppState } from '../../app.reducers';
import { Deposit } from '../deposit.model';
import { Subscription } from '../../../../node_modules/rxjs';
import { DepositService } from '../deposit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  items: Deposit[];
  itemsSubscriptions: Subscription = new Subscription();

  constructor(  private store: Store<AppState>,
                private depositService: DepositService) { }

  ngOnInit() {
    this.itemsSubscriptions =  this.store.select('deposit').subscribe(
      deposits => {
        this.items = deposits.items;
      }
    )
  };

  ngOnDestroy() {
    this.itemsSubscriptions.unsubscribe();
  }

  deleteItem = (item: Deposit) => {
    console.log(item);
    this.depositService.deleteDeposit(item.uid)
      .then( () => {
        Swal('Eliminando', item.description, 'success');
      })
      .catch();

  }

}
