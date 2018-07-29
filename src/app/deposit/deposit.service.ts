import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Deposit } from './deposit.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { filter, map } from 'rxjs/operators';
import { SetItemsActions, UnsetItemsActions } from './deposit.actions';
import { Subscription } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  depositListenerSubscriptions: Subscription = new Subscription();
  depositItemsSubscriptions: Subscription = new Subscription();

  constructor(  private afDB: AngularFirestore,
                public authService: AuthService,
                private store: Store<AppState>) { }

  initDepositListener = () => {
    this.depositListenerSubscriptions =  this.store.select('auth')
              .pipe(filter( auth => auth.user != null))
              .subscribe(auth => this.depositItems(auth.user.uid));
  }

  private depositItems = ( uid: string ) => {
    this.depositItemsSubscriptions = this.afDB.collection(`${ uid }/deposits/items`)
      .snapshotChanges()
      .pipe(
        map( docDacta => {
          return docDacta.map( doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe(
        (collection: any[]) => {
          this.store.dispatch( new SetItemsActions (collection) );
        }
      )
  }

  cancelSubscriptions = () => {
    this.depositListenerSubscriptions.unsubscribe();
    this.depositItemsSubscriptions.unsubscribe();
    this.store.dispatch( new UnsetItemsActions() );
  }

  addDeposit = ( deposit: Deposit) => {
    const user = this.authService.getUser();
    return this.afDB.doc(`${ user.uid }/deposits`)
    .collection('items').add( {...deposit});
  }

  deleteDeposit = (uid: string) => {
    const user = this.authService.getUser();
    return this.afDB.doc(`${ user.uid }/deposits/items/${ uid }`).delete();
  }
}
