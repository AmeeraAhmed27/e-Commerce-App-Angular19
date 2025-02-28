import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate/mytranslate.service';
import { CartService } from '../../core/services/cart/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  isLogin=input<boolean>(true);

  private readonly authService=inject(AuthService);
  private readonly mytranslateService=inject(MytranslateService);
  readonly translateService=inject(TranslateService);
  readonly cartService=inject(CartService);

  countNumber:number = 0

ngOnInit(): void {
   this.cartService.cartNumber.subscribe({
    next:(data)=>{
      this.countNumber=data
    }
  })
}
  logOut():void{
    this.authService.logOut();
  }


  change(lang:string){
     this.mytranslateService.changeLangTranslate(lang);
  }

  currenLang(lang:string):boolean{
    return this.translateService.currentLang === lang
  }
}


