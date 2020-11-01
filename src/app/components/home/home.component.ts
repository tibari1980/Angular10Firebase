import { AngularFireDatabase } from '@angular/fire/database';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products:Observable<any[]>;
  constructor(private db:AngularFireDatabase) {  }

  ngOnInit(): void {
    this.products=this.db.list('products').valueChanges();
    
  }

}
