import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ProductInvoice } from './invoice.model';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  productInvoice = new ProductInvoice()
  customers: any
  customer: any
  products: any
  product: any
  searchQueryCustomer: any
  searchQueryProduct: any
  selectedProducts: ProductInvoice[] = []

  subtotal = 0

  ngOnInit(): void {
  }


  searchCustomers() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/customer/search?searchText=' + this.searchQueryCustomer, { headers })
      .subscribe(map => {
        this.customers = map.Data;
        console.log(map.Data);
      })
  }

  searchProducts() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/product/search?searchText=' + this.searchQueryProduct, { headers })
      .subscribe(map => {
        this.products = map.Data;
        console.log(map.Data)
      })
  }

  selectedCustomerRow(cus: any) {
    this.customer = cus
  }


  getAllCustomer() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/customer/getAll', { headers })
      .subscribe(map => {
        this.customers = map.Data;
      })
  }


  selectedProductRow(pro: any) {
    this.product = pro
    let isProductsExists = (this.selectedProducts.some(p => {
      if (p.pid == pro.pid) {
        p.quantity += 1
        $("#productClose").click();
        this.updateSubtotal()
        return true
      } else return false;
    }));
    if (!isProductsExists) {
      this.selectedProducts.push(this.product)
      console.log(this.selectedProducts);
      $("#productClose").click();
      this.updateSubtotal()
    }

  this.updateSubtotal()


  }

  updateSubtotal() {
    this.subtotal = 0
    this.selectedProducts.forEach(element => {
      this.subtotal += element.price * element.quantity;
    });
  }
  increaseQuantity(product: ProductInvoice) {
    product.quantity++
    this.updateSubtotal()

  }

  getAllProduct() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/product/getAll', { headers })
      .subscribe(map => {
        this.products = map.Data;
        console.log(map.Data);
      })
  }


  removeProduct(pArr: any) {
    this.selectedProducts.splice(this.selectedProducts.indexOf(pArr), 1)
    this.updateSubtotal()
  }
}
