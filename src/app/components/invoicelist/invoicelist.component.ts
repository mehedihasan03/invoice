import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.css']
})
export class InvoicelistComponent implements OnInit {

  constructor(private http: HttpClient) { }

  searchQuery:any
  invoices: any
  ngOnInit(): void {
    this.getAllProduct()
  }

  searchItems(){
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/invoice/search?searchText=' + this.searchQuery, { headers })
      .subscribe(map => {
        console.log(this.invoices);
        
        this.invoices = map.Data;
      })
  }


  getAllProduct() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/invoice/getAll', { headers })
      .subscribe(map => {
        console.log(map.Data);
        
        this.invoices = map.Data;
      })
  }
}
