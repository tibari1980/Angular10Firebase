import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productModule:Product=new Product;
  //inject le service 
  constructor(private productService:ProductService, private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
  }

 //Création d'un product
  onSubmitProd(){
    this.productModule.image="products";
   this.productService.createProduct(this.productModule);
   this.productModule=new Product; 
   this.route.navigate(['products']);
  }

  log(nom){
    console.log(nom);
  }
}
