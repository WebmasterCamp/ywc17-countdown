import { SettingComponent } from './setting/setting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountdownComponent } from './countdown/countdown.component';

const routes: Routes = [
  { path: '', component: CountdownComponent, pathMatch: 'full' },
  { path: 'setting', component: SettingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
