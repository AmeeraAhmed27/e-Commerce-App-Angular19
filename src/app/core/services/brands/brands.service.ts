import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }
  getAllBrands():Observable<any>{
    return this.httpClient
    .get(
      `${environment.baseUrl}/api/v1/brands`
      )
  }

  getSpecificCategory(id:string):Observable<any>{
    return this.httpClient
    .get(
      `${environment.baseUrl}/api/v1/brands/${id}`
    );
  }
}
