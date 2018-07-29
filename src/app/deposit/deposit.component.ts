import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Deposit } from './deposit.model';
import { DepositService } from './deposit.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2'
import { ActiveLoadingAction, DisableLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styles: []
})
export class DepositComponent implements OnInit, OnDestroy {

  form: FormGroup;
  type = 'income';

  loadingSubscritions: Subscription = new Subscription();
  loading: boolean;

  constructor(  public depositService: DepositService,
                private store: Store<AppState>  ) { }

  ngOnInit() {

    this.loadingSubscritions =  this.store.select('ui').subscribe(
      ui => this.loading = ui.isLoading
    )

    this.form = new FormGroup({
      'description': new FormControl('', Validators.required ),
      'acount': new FormControl(0, Validators.min(1))
    })
  }

  ngOnDestroy() {
    this.loadingSubscritions.unsubscribe();
  }

  addIncome = () => {
    this.store.dispatch ( new ActiveLoadingAction() );
    const deposit = new Deposit({... this.form.value, type: this.type });
    this.depositService.addDeposit( deposit )
    .then( () => {
      Swal('Deposito guardado', deposit.description, 'success');
      this.form.reset({ acount: 0 });
      this.store.dispatch ( new DisableLoadingAction() );
    })
    .catch( error => {
      console.error('error al guardar el ingreso', error);
      
    });
  }

}
