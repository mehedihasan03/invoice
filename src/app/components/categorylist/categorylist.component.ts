import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  Categories: any;
  isGetCategory: boolean = true

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/category/getAll', { headers })
      .subscribe(map => {
        console.log(map.Data);
        this.Categories = map.Data;
      })
  }



  editCategory(cat: any) {
    this.router.navigate(['category'], { state: { categ: cat, isSave: false } })
    this.Categories.cname = cat.cname
  }


  deleteCategory(cat: any) {
    const headers = { 'content-type': 'application/json' };
    this.http.get("http://localhost:9988/category/delete/" + cat.cid, { headers: headers })
      .subscribe(data => {
        this.getCategories();
      }
      )
  }

}
