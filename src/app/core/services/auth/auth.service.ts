import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  private readonly router = inject(Router);

  userData: any = null;

  sendRegisterForm(data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }
  sendLoginForm(data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!)
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this.router.navigate(['/login'])
  }


  setEmailVerify(data: object): Observable<any> {
    return this, this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }


  setCodeVerify(data: object): Observable<any> {
    return this, this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }

  setResetPassword(data: object): Observable<any> {
    return this, this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, data)
  }

}
