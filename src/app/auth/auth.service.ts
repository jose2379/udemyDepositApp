import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import Swal from 'sweetalert2'
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(
    ( fbUser: firebase.User ) => {
        console.log('fbUser', fbUser);
      }
    )
  }

  createUser = (name: string, email: string, password: string) => {
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
      })
      .catch( error => {
        console.error('qué pasa', error);
      })

    })
    .catch( error => {
      Swal('Error en el login', error.message, 'error');
    })
  }

  login = (email: string, password: string) => {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then( res => {
      this.router.navigate(['/']);
    })
    .catch( error => {
      Swal('Error en el login', error.message, 'error');
    })
  }

  logout = () => {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(map( fbUser =>{
      if ( fbUser == null ) {
        this.router.navigate(['/login']);
      }
      return fbUser !== null;
    }));
  }
}
