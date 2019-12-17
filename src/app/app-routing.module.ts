import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { FindAllComponent } from './find-all/find-all.component';
import { UpdataComponent } from './updata/updata.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { FindAllWithPageComponent } from './find-all-with-page/find-all-with-page.component';
import { FindAllWithAgeComponent } from './find-all-with-age/find-all-with-age.component';
import { AngularUpdataComponent } from './angular-updata/angular-updata.component';


const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent},
  {path: 'home',component: HomeComponent},
  {path: 'find-all',component: FindAllComponent},
  {path: 'createcustomer',component: CreatecustomerComponent},
  {path: 'updata',component: UpdataComponent},
  {path: 'customer-details',component: CustomerDetailsComponent},
  {path: 'find-all-with-page',component: FindAllWithPageComponent},
  {path: 'find-all-with-age',component: FindAllWithAgeComponent},
  {path: 'angular-updata',component: AngularUpdataComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
