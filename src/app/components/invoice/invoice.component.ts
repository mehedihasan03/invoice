import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ProductInvoice } from './invoice.model';
import { invoiceData } from './invoicedata.model';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  invoiceData = new invoiceData()
  productInvoice = new ProductInvoice()
  customers: any
  customer: any
  products: any
  product: any
  searchQueryCustomer: any
  searchQueryProduct: any
  selectedProducts: ProductInvoice[] = []
  subtotal = 0
  vat = 0
  total = 0
  shipping = 0

  isButtonShow = true

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
      this.vat = this.subtotal * (15 / 100)
      this.total = this.subtotal + this.vat + this.shipping


      if (this.subtotal > 0) {
        this.shipping = 100
      }
      if (this.subtotal > 10000) {
        this.shipping = 300
      }
      if (this.subtotal > 50000) {
        this.shipping = 500
      }
      if (this.subtotal > 100000) {
        this.shipping = 800
      }
    });
  }


  increaseQuantity(product: ProductInvoice) {
    product.quantity++
    this.updateSubtotal()
  }

  decreaseQuantity(product: ProductInvoice) {
    product.quantity--
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
    this.vat = this.subtotal * (15 / 100)
    this.total = this.subtotal + this.vat + this.shipping
  }

  onPrint() {
    this.saveInvoice()
    console.log(this.invoiceData.paymentDate);

    let printContents = document.getElementById("pdf")!.innerHTML;
    let originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    console.log(this.invoiceData.paymentDate + "ujfhugh");

  }

  saveInvoice() {
    this.invoiceData.totalPrice = this.total
    this.invoiceData.customerName = this.customer.name
    const headers = { 'content-type': 'application/json' };
    this.http.post<any>("http://localhost:9988/invoice/save", JSON.stringify(this.invoiceData), { headers: headers })
      .subscribe(map => {
        console.log(map.Data);

        alert("Invoice created Successfull")
        // this.category = new Category();    
      }, err => {
        alert("Invalid invoice")
      }
      )
  }

}
