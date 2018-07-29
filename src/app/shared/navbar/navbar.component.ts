import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  name: string;
  subscriptions: Subscription = new Subscription();

  constructor(  public authService: AuthService,
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

}
