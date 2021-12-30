import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { AddcustomerComponent } from './components/addcustomer/addcustomer.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { CalenderComponent } from './components/calender/calender.component';
import { CategorylistComponent } from './components/categorylist/categorylist.component';
import { CustomerlistComponent } from './components/customerlist/customerlist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "login", component: LoginComponent}, {path: "signUp", component: SignupComponent},

  {path: "", component: LayoutComponent, canActivateChild: [AuthGuard],  children:[
    {path: "", component: DashboardComponent}, {path: "category", component: AddcategoryComponent},
    {path: "invoice", component: InvoiceComponent}, {path: "categoryList", component: CategorylistComponent},
    {path: "addProduct", component: AddproductComponent}, {path: "productList", component: ProductlistComponent},
    {path: "calender", component: CalenderComponent}, {path: "addCustomer", component: AddcustomerComponent},
    {path: "customerList", component: CustomerlistComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
