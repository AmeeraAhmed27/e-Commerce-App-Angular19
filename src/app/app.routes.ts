import { authGuard } from './core/guards/auth.guard';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
    
    {
        path: '',
        component: AuthLayoutComponent,canActivate:[logedGuard],
        children: [
            {path:'',redirectTo:'login' ,pathMatch:'full'},
            { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'login' },
            { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'register' },
            { path: 'forgetpassword', loadComponent: () => import('./pages/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent), title: 'register' },
            
        ]
    },
    {
        path: '',
        component: BlankLayoutComponent,canActivate:[authGuard],
        children: [
            {path:'',redirectTo:'home' ,pathMatch:'full'},
            { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'home' },
            { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: 'cart' },
            { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), title: 'products' },
            { path: 'allorders', loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent), title: 'allorders' },
            { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: 'brands' },
            { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'categories' },
            { path: 'checkout/:id', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), title: 'checkout' },
            { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), title: 'details' },
            { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent), title: 'wishlist' },
            { path: '**', component: NotfoundComponent }
        ]
    },
    { path: '**', component: NotfoundComponent }
];

// import { Component } from '@angular/core';
// import { Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
// import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
// import { HomeComponent } from './pages/home/home.component';
// import { CartComponent } from './pages/cart/cart.component';
// import { CheckoutComponent } from './pages/checkout/checkout.component';
// import { CategoriesComponent } from './pages/categories/categories.component';
// import { BrandsComponent } from './pages/brands/brands.component';
// import { ProductsComponent } from './pages/products/products.component';
// import { NotfoundComponent } from './pages/notfound/notfound.component';

// export const routes: Routes = [
//     {path:'',redirectTo:'home',pathMatch:'full'},
//     {
//         path:'', component:AuthLayoutComponent
//         ,children:[
//             {path:'login', component:LoginComponent,title:'login'},
//             {path:'register', component:RegisterComponent,title:'register'},
            
            
//         ]
//     },
//     {
//         path:'', component:BlankLayoutComponent
//         ,children:[
//             {path:'home', component:HomeComponent,title:'home'},
//             {path:'cart', component:CartComponent,title:'cart'},
//             {path:'products', component:ProductsComponent,title:'produccts'},
//             {path:'brands', component:BrandsComponent,title:'brands'},
//             {path:'categories', component:CategoriesComponent,title:'categories'},
//             {path:'checkout', component:CheckoutComponent,title:'checkout'},
            
//         ]
//     },
//     {path:'**',component:NotfoundComponent}
    
// ];
