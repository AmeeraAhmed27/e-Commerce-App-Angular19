import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const id = inject(PLATFORM_ID);
    
    if (isPlatformBrowser(id)) {
        // Check if the user is logged in
        if (localStorage.getItem('userToken') !== null) {
            // User is logged in, allow access to protected routes
            return true; // Allow access to routes like /home
        } else {
            // User is not logged in, redirect to login
            router.navigate(['/login']);
            return false; // Deny access to protected routes
        }
    }
    return false; // Deny access if not in the browser
};