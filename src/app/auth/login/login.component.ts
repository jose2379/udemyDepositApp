import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '../../../../node_modules/@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean;
  subcriptions: Subscription;

  constructor(  private authService: AuthService,
                public store: Store<AppState>) { }

  ngOnInit() {
    this.subcriptions = this.store.select('ui').subscribe(
      ui => {
        this.loading = ui.isLoading;
      }
    );
  }
  ngOnDestroy() {
    this.subcriptions.unsubscribe();
  }

  onSubmit = (data: any) => {
    this.authService.login(data.email, data.password);
  }

}
