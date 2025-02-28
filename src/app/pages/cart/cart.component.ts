import { CurrencyPipe } from '@angular/common';
import { ICart } from '../../shared/interfaces/icart';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  private readonly cartService =inject(CartService);

  cartDetails:ICart ={} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data

      },
      error:(err)=>{
        console.log(err);
      }

    })
  }


  removeItem(id:string):void{

    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data

      },
      error:(err)=>{
        console.log(err);
      }
    })

  }


  updateCount(id:string , count:number):void{
    this.cartService.updateProductQuantity(id,count).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  clearItems():void{
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === 'success'){
        this.cartDetails = {} as ICart
        }

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
