import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  Products: any

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/product/getAll', { headers })
      .subscribe(map => {
        console.log(map.Data);

        this.Products = map.Data;

      })
  }

  editProduct(pro: any) {

    this.Products.pname = pro.pname
    this.Products.cname = pro.cname
    this.Products.price = pro.price
    console.log(this.Products);
    

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
