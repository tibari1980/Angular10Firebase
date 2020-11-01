import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private endpoint='/products';
  productsRef:AngularFireList<Product>;

  //Dependency inject angularDataBase from angularFire library
  constructor(private db:AngularFireDatabase) { 
    this.productsRef=db.list(this.endpoint);
  }

  createProduct(product:Product):void{
    this.productsRef.push(product);
  }
  updataProduct(key:string,value:any):Promise<void>{
    return this.productsRef.update(key,value);
  }
  deleteProduct(key:string):Promise<void>{
    return this.productsRef.remove(key);
  }

  findOneProduct(key:string):Promise<void>{
    return null;
  }
  
  //getAll product
  findAllProduct():AngularFireList<Product>{
    return this.productsRef;
  }
  //deleteAll
  deleteAllProduct():Promise<void>{
    return this.productsRef.remove();
  }


}
