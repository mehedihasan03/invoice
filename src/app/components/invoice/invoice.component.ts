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
  ngOnInit(): void {
  }

  selectedRow(cus: any){
    console.log(cus);
    this.customer = cus
  }

  addCustomerDetails(){
    this.customer = this.customer
    
  }


  getAllCustomer() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/customer/getAll', { headers })
      .subscribe(map => {
        this.customers = map.Data;
        console.log(map.Data);
        
      })
  }
}
