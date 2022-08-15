import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, delay, filter, switchMap, of } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import IUser from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersCollection = db.collection('users');
    this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000));

    //melakukan stream event dari router service
    this.router.events
      .pipe(
        //melakukan filter untuk mendapatkan event dari NavigationEnd saja
        filter((e) => e instanceof NavigationEnd),
        //untuk mendapatkan ActivatedRoute object dari root firsh child
        map((e) => this.route.firstChild),
        //untuk hanya mengambil observable data dari ActivetedRoute
        switchMap((route) => route?.data ?? of({}))
      )
      //Melakukan subscribe ke observable dan melakukan assign ke redirect
      .subscribe((data) => (this.redirect = data.authOnly ?? false));
  }

  async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Password not provided!');
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string,
      userData.password as string
    );

    if (!userCred.user) {
      throw new Error("User can't be found");
    }

    await this.usersCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCred.user.updateProfile({
      displayName: userData.name,
    });

    // await console.log(userCred);
  }

  async logout(e?: Event) {
    if (e) e.preventDefault();
    try {
      await this.auth.signOut();
      if (this.redirect) await this.router.navigateByUrl('/');
    } catch (error) {
      console.error(error);
    }
  }
}
