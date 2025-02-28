import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)
  carItems:BehaviorSubject<any> = new BehaviorSubject(0)

  get myToken(): string {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('userToken') || '' : '';
  }

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart/', 
    {
      "productId": id
    }, {
      headers: {
        token: this.myToken
      }
    });
  }


  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token: this.myToken
        }
      });
  }


  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: {
          token: this.myToken
        }
      });
  }


  updateProductQuantity(id:string, newCount:number):Observable<any>{
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        "count":newCount
      },{
        headers: {
          token: this.myToken
        }
      });
  }


  clearCart():Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token: this.myToken
        }
      });
  }
}