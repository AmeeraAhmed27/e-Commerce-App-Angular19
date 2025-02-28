import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if localStorage is available
  if (typeof window !== 'undefined' && localStorage.getItem('userToken')) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('userToken')!
      }
    });
  }
  return next(req);
};

// import { HttpInterceptorFn } from '@angular/common/http';

// export const headersInterceptor: HttpInterceptorFn = (req, next) => {

//   if(localStorage.getItem('userToken')){
//     req=req.clone({
//       setHeaders:{
//         token:localStorage.getItem('userToken')!
//       }
//     })
//   }
//   return next(req);
// };
