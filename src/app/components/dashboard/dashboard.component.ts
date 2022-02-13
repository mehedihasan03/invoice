import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalSaleOfMonth: any
  totalCustomer: any
  totalCountProduct: any

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.totalSaleOfCurrentMonth()
    this.totalCustomerCount()
    this.totalProductCount()
  }

  totalSaleOfCurrentMonth() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/invoice/current-sale', { headers })
      .subscribe(map => {
        this.totalSaleOfMonth = map.Data;
      })
  }

  totalCustomerCount() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/customer/count-customer', { headers })
      .subscribe(map => {
        this.totalCustomer = map.Data;
      })
  }

  totalProductCount() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/product/count-product', { headers })
      .subscribe(map => {
        this.totalCountProduct = map.Data;
      })
  }
}
