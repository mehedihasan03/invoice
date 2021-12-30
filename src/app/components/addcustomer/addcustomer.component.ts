import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from './customer.model';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {

  customer = new Customer()
  isSave: boolean = true

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    

    if (history.state.isSave != undefined) {
      this.customer = history.state.cust
      this.isSave = history.state.isSave
      console.log(history.state.cust);
    }
  }

  saveCustomer() {
    const headers = { 'content-type': 'application/json' };
    this.http.post<any>("http://localhost:9988/customer/save", JSON.stringify(this.customer), { headers: headers })
      .subscribe(data => {
        alert("New Customer Added Successfull")
        this.customer = new Customer();
        this.isSave = true
      }, err => {
        alert("product already exist")
      }
      )
  }

  updateCustomer() {
    const headers = { 'content-type': 'application/json' };
    this.http.post<any>("http://localhost:9988/customer/update", JSON.stringify(this.customer), { headers: headers })
      .subscribe(data => {
        this.customer = new Customer()
        alert("Customer Updated Successfully")
        this.isSave = true
      }
      )
  }
}
