import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,SearchPipe,FormsModule,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  
  private readonly productsService=inject(ProductsService);
  private readonly categoriesService=inject(CategoriesService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService)

  text:string= "";
  products:IProduct[]=[];
  categories:ICategory[]=[];
  
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
  items:1,
    nav: false
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
 
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

  getCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categories=res.data;

      },
      error:(err)=>{
        console.log(err);
      }

    })
  }

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
   
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


