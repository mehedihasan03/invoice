import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../addcustomer/customer.model';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {

  customer = new Customer()
  customers: any


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getAllCustomer()
  }

  getAllCustomer() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/customer/getAll', { headers })
      .subscribe(map => {

        this.customers = map.Data;

      })
  }

  editCustomer(cus: any) {

    this.customer.name = cus.name
    this.customer.email = cus.email
    this.customer.phone = cus.phone
    this.customer.address = cus.address
    console.log(this.customer);
    

    this.router.navigate(['addCustomer'], { state: { cust: cus, isSave: false } })
  }


  deleteCustomer(cus: any) {
    const headers = { 'content-type': 'application/json' };
    this.http.get("http://localhost:9988/customer/delete/" + cus.id, { headers: headers })
      .subscribe(data => {
        this.getAllCustomer();
      }
      )
  }

}

