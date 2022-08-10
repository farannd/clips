import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

firebase.initializeApp(environment.firebase);

//digunakan agar angular tidak jalan berulang
//hanya sekali
let appInit = false;

//event method
//trigger ketika ada perubahan saat user melakukan login atau logout
firebase.auth().onAuthStateChanged(() => {
  if (!appInit) {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  }

  appInit = true;
});
