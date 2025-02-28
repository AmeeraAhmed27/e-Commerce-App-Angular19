import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  get myToken(): string {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('userToken') || '' : '';
  }

  checkOutPayMent(id:string , data:object):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
    {
      "shippingAddress":data
    },{
      headers:{
       token: this.myToken
      }
    }
    
    )
  }


}
