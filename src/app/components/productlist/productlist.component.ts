import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../addproduct/product.model';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  product = new Product()
  products: any
searchQuery:any
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getAllProduct()
  }

  searchItems(){
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/product/search?searchText=' + this.searchQuery, { headers })
      .subscribe(map => {
        this.products = map.Data;
      })
  }

  getAllProduct() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/product/getAll', { headers })
      .subscribe(map => {

        this.products = map.Data;

      })
  }

  editProduct(pro: any) {

    this.product.pname = pro.pname
    this.product.cname = pro.cname
    this.product.price = pro.price
    console.log(this.product);
    

    this.router.navigate(['addProduct'], { state: { prod: pro, isSave: false } })
  }


  deleteProduct(pro: any) {
    const headers = { 'content-type': 'application/json' };
    this.http.get("http://localhost:9988/product/delete/" + pro.pid, { headers: headers })
      .subscribe(data => {
        this.getAllProduct();
      }
      )
  }

}
