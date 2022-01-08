import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router) { }

  customers: any
  customer: any
  products:any
  product: any


  ngOnInit(): void {
  }

  selectedCustomerRow(cus: any){
    console.log(cus);
    this.customer = cus
  }


  getAllCustomer() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/customer/getAll', { headers })
      .subscribe(map => {
        this.customers = map.Data;
        console.log(map.Data);
        
      })
  }

  selectedProductRow(pro: any){
    console.log(pro);
    this.product = pro
  }

  getAllProduct() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/product/getAll', { headers })
      .subscribe(map => {
        this.products = map.Data;
        console.log(map.Data);
        
      })
  }


}
