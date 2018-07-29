import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DepositService } from '../../deposit/deposit.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  name: string;
  subscriptions: Subscription = new Subscription();

  constructor(  public authService: AuthService,
                public depositService: DepositService,
                private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(
      auth => {
        this.name = auth.user.name;
      }
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  logout = () => {
    this.authService.logout();
    this.depositService.cancelSubscriptions();
  }

}
