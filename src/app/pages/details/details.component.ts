import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { DatePipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CarouselModule,DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly productsService=inject(ProductsService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);

  // detailsProduct:IProduct ={} as IProduct;
  detailsProduct:IProduct  | null =null;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    },
    nav: false
};
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        console.log(p.get('id'))
        let idProduct=p.get('id');
         this.productsService.getSpesificProducts(idProduct).subscribe({
          next:(res)=>{
            console.log(res.data)

            this.detailsProduct=res.data;
          },
          error:(err)=>{
            console.log(err)
          }

         })
      }
    })
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
}
