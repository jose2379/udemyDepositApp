import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import Swal from 'sweetalert2'
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { ActiveLoadingAction, DisableLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from '../../../node_modules/rxjs';
import { UnsetItemsActions } from '../deposit/deposit.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  activateAction;
  deactivateAction;
  private subcriptions: Subscription = new Subscription();
  private user: User;

  constructor(  private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore,
                private store: Store<AppState> ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(
    ( fbUser: firebase.User ) => {
        if (fbUser) {
          this.subcriptions = this.afDB.doc(`${ fbUser.uid }/user`).valueChanges().subscribe(
            (userObj: any) => {
              const newUser = new User( userObj );
              this.store.dispatch( new SetUserAction ( newUser ) );
              this.user = newUser;
            }
          )
        } else {
          this.user = null;
          this.subcriptions.unsubscribe();
        }
      }
    );
    this.activateAction = new ActiveLoadingAction();
    this.deactivateAction = new DisableLoadingAction();
  }

  createUser = (name: string, email: string, password: string) => {
    this.store.dispatch( this.activateAction );
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( res => {
      
      const user: User = {
        uid: res.user.uid,
        name: name,
        email: res.user.email
      };

      console.log('user antes del envio', user);

      this.afDB.doc(`${ user.uid }/user`)
      .set( user )
      .then( () => {
        this.router.navigate(['/']);
        this.store.dispatch( this.deactivateAction );
      })
      .catch( error => {
        console.error('qué pasa', error);
      })

    })
    .catch( error => {
      Swal('Error en el login', error.message, 'error');
      this.store.dispatch( this.deactivateAction );
    })
  }

  login = (email: string, password: string) => {
    this.store.dispatch( this.activateAction );
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then( res => {
      this.router.navigate(['/']);
      this.store.dispatch( this.deactivateAction );
    })
    .catch( error => {
      Swal('Error en el login', error.message, 'error');
      this.store.dispatch( this.deactivateAction );
    })
  }

  logout = () => {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
    this.store.dispatch( new UnsetItemsActions() );
  }

  isAuth() {
    return this.afAuth.authState.pipe(map( fbUser =>{
      if ( fbUser == null ) {
        this.router.navigate(['/login']);
      }
      return fbUser !== null;
    }));
  }

  getUser = () => {
    return { ...this.user };
  }
}
