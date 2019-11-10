import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CountdownComponent } from './components/countdown/countdown.component';
import { environment } from '../environments/environment';
import { SettingDialogComponent } from './components/setting-dialog/setting-dialog.component';
import { AdminComponent } from './components/admin/admin.component';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatProgressSpinnerModule,
  MatSpinner
} from '@angular/material/progress-spinner';
import { AdminSigninCardComponent } from './components/admin/admin-signin-card/admin-signin-card.component';
import { AdminActionCardComponent } from './components/admin/admin-action-card/admin-action-card.component';
const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [{ provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID }]
};

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    SettingDialogComponent,
    AdminComponent,
    AdminSigninCardComponent,
    AdminActionCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SettingDialogComponent]
})
export class AppModule {}
