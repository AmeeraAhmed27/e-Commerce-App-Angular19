import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {



  constructor(private _HttpClient:HttpClient) { }
    getLoggedUserWishlist():Observable<any>{
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
    }
    
    addProductTowishlist(id:string):Observable<any>{
      return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {"productId" : id} )
    }


    deleteProductFromWishlist(p_id:string):Observable<any>{
      return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${p_id}`)
  
    }
  
}
