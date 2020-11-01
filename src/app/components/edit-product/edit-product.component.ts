import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { map, } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productArray = [];
  productModule: Product = new Product();
  constructor(private productService: ProductService, private route: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
    let code = this.router.snapshot.params.id;
    this.productService.findAllProduct().snapshotChanges(['child_added'])
      .subscribe(actions => {
        actions.forEach(action => {
          //console.log(action.type);
          if (code == action.key) {
            this.productModule.$key = action.key;
            this.productModule = action.payload.val();
            this.productModule.$key = code;
          }
          //console.log(action.key);
          //this.productModule=action.payload.val();
          //console.log('tibari'+this.productModule.dataAjouter)
          //this.productModule.$key=action.key;
          //console.log(action.payload.val());
          //this.productArray.push(this.productModule);
          //console.log('tibari ok  :'+this.productModule);
        });
      });



  }
  onUpdate() {
    const promise=this.productService.updataProduct(this.productModule.$key,
      {
        nom: this.productModule.nom,
        description: this.productModule.description,
        dataAjouter: this.productModule.dataAjouter,
        prixAchat: this.productModule.prixAchat,
        prixVente: this.productModule.prixVente,
        isDisponible: this.productModule.isDisponible,
        isPromotion: this.productModule.isPromotion,
        isSelected: this.productModule.isSelected,
        quantiteStock: this.productModule.quantiteStock,
        image: 'product.jpg'
      });
      promise.then(_=>console.log('Product updated successfully'))
      .catch(err=>console.log(err,'do you ha an error try again'));
      this.route.navigate(['/products']);
  }




}
