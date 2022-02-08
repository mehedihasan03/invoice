import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CategorylistComponent } from './components/categorylist/categorylist.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { CalenderComponent } from './components/calender/calender.component';
import { AddcustomerComponent } from './components/addcustomer/addcustomer.component';
import { CustomerlistComponent } from './components/customerlist/customerlist.component';
import { InvoicelistComponent } from './components/invoicelist/invoicelist.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AddproductComponent,
    ProductlistComponent,
    InvoiceComponent,
    CategorylistComponent,
    AddcategoryComponent,
    CalenderComponent,
    AddcustomerComponent,
    CustomerlistComponent,
    InvoicelistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
