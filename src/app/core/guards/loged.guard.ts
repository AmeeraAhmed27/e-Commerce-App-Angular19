import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const id = inject(PLATFORM_ID);
    
    if (isPlatformBrowser(id)) {
        // Check if the user is logged in
        if (localStorage.getItem('userToken') !== null) {
            // User is logged in, redirect to home
            router.navigate(['/home']);
            return false; // Deny access to login/register
        } else {
            // User is not logged in, allow access
            return true; // Allow access to login/register
        }
    }
    
    return false; // Deny access if not in the browser
};