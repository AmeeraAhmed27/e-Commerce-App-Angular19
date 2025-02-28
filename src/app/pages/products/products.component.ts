import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [RouterLink,SearchPipe,FormsModule,TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly productsService=inject(ProductsService);
    private readonly categoriesService=inject(CategoriesService);
    private readonly cartService=inject(CartService);
    private readonly toastrService=inject(ToastrService);
    private readonly _WishlistService = inject(WishlistService);

     text:string= "";
      products:IProduct[]=[];
  
  getProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.products=res.data;

      },
      error:(err)=>{
        console.log(err);
      }

    })
  }



  ngOnInit(): void {
    this.getProductsData();
    
   
  }

  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log("res",res);
        if(res.status === 'success'){
          this.toastrService.success(res.message,'FreshCart')
          this.cartService.cartNumber=res.numberOfCartItems;

        }

      },
      error:(err)=>{
        console.log(err);
      }

    })
  }
  addItemToWishlist(id:string){
    this._WishlistService.addProductTowishlist(id).subscribe({
      next:(res)=>{console.log(res)
        console.log(this.cartService.cartNumber)
        this.toastrService.success(res.message , 'Done')
      },
      error:(err)=>{console.log(err)}
    })
  }

}
