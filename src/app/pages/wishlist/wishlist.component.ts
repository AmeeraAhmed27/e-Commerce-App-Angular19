import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwish } from '../../shared/interfaces/iwish';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe,TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  wishlistItems!:Iwish[]
  getwishSub!:Subscription

  ngOnInit(): void {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log(res.data)

        this.wishlistItems = res.data
      },
      error:(err)=>{
        console.log(err)
      }


    })
  }

  addItem(p_id:string){
    this._CartService.addProductToCart(p_id).subscribe({
      next:(res)=>{console.log(res)
        this._CartService.cartNumber.next(res.numOfCartItems)
        this._ToastrService.success(res.message , 'Done')
        this.wishlistItems = res.data
      },
      error:(err)=>{console.log(err)}
    })
  }

  deleteItem(p_id:string):void{
   this.getwishSub = this._WishlistService.deleteProductFromWishlist(p_id).subscribe({
      next:(res)=>{console.log(res.data)
        console.log(this.wishlistItems)
        const idsToRemove = res.data; // e.g., ["6428e479dc1175abc65ca078", "6428eb43dc1175abc65ca0b3", "6428ebc6dc1175abc65ca0b9"];
      
      // Filter wishlistItems to keep only those items whose IDs are in idsToRemove
      this.wishlistItems = this.wishlistItems.filter(item => idsToRemove.includes(item.id));
        this._ToastrService.success(res.message , 'Done')
        // this.wishlistItems = res.data
        
        
      },
      error:(err)=>{console.log(err)}
    })

  }

}
