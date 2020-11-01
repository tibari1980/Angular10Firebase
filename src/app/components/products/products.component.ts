import { ProductService } from './../../services/product.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
//important 
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products;
  constructor(private productService:ProductService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
     this.products=this.productService.findAllProduct().snapshotChanges().pipe(
       map(changes=>{
         return changes.map(c=>({$key:c.payload,...c.payload.val()}));
       })
     )
    console.log(this.products);
  }
   /*
  getAllProduct():void{
    this.productsFireList=this.productService.findAllProduct();
    this.productsFireList.snapshotChanges().subscribe(actions=>{
      actions.forEach(action=>{
         let y=action.payload.toJSON();
          y['$key']=action.key
          //this.products.push(y as Product)
          this.products.push(y as Product);
      })
    })
    console.log(this.products);
  }
   */

  OnUpdateProduct($key){
    this.route.navigate(["/edit-product/"+$key]);
  }

  OnDeleteProduct($key){
    const conf=confirm('êtes-vous sur de vouloir supprir ce produict:'+$key);
    if(conf){
      //this.productService.deleteProduct($key).catch(erro=>console.log(erro));
      const promise=this.productService.deleteProduct($key);
      promise.then(_=>console.log('Product deleted successfully'))
      .catch(err=>console.log(err,'You do not have access plaize try again'));
    }
    
    
  }

}
