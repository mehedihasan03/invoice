import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  category = new Category()
  isSave: boolean = true

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    if (history.state.isSave != undefined) {
      this.category = history.state.categ
      this.isSave = history.state.isSave
     
      console.log(history.state.categ.cname);
      
    }
  }

  addCategory(){
    
    const headers = { 'content-type': 'application/json' };
    this.http.post<any>("http://localhost:9988/category/save", JSON.stringify(this.category), { headers: headers })
      .subscribe(data => {
      alert("New Category Added Successfull")
      this.category = new Category();
      this.isSave = true
      },err =>{
        alert("Category already exist")
     }
      )
  }

  updateCategory(){
    
    const headers = { 'content-type': 'application/json' };
    this.http.post<any>("http://localhost:9988/category/update", JSON.stringify(this.category), { headers: headers })
      .subscribe(data => {
        this.category = new Category()
        alert("Category Updated Successfully")
        this.isSave = true
      }
      )
  }


}
