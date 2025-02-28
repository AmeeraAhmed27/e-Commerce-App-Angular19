import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService=inject(AuthService);
  private readonly router = inject(Router);

  isLoading:boolean=false;
  msgError:string = "";
  success:string="";

  loginForm: FormGroup = new FormGroup({
   
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, /*Validators.pattern(/^[A-Z]\w 7 $/)*/]),
   
  }, {
    
  });
  
  submitForm(): void {
    if(this.loginForm.valid){
      this.isLoading=true;

      console.log(this.loginForm)

      this.authService.sendLoginForm(this.loginForm.value).subscribe(  
        {
          next:(res)=>{
            
            console.log(res);

            localStorage.setItem('userToken',res.token);

            this.authService.saveUserData();

            if(res.message === 'success'){
              //  setTimeout(()=>{
              //   this.router.navigate(['/home'])
              //  },500)
              this.router.navigate(['/home']).then(success => {
                console.log("Navigation success:", success);
            }).catch(err => {
                console.error("Navigation error:", err);
            });
              this.success=res.message;
              //this.router.navigate(['/home'])
              console.log("hi")
              
            }

            this.isLoading=false;

          },
          error:(err:HttpErrorResponse)=>{
            this.isLoading=false;
            this.msgError=err.error.message;
            
            console.log(err)
          }

        }

        
        )
    }else{
      // this.registerForm.setErrors({mismatch:true})
      this.loginForm.markAllAsTouched();
    }
    
  }
confiermPassword(group:AbstractControl){
  const password= group.get('password')?.value;
  const rePassword= group.get('rePassword')?.valid;

  return password === rePassword ? null :{mismatch:true}
}
}
