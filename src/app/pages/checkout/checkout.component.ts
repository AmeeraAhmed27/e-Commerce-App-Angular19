import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,TranslatePipe ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);

  cartId: string = "";

  checkOutForm!: FormGroup;

  ngOnInit(): void {
    this.initForm()

    this.getCartId()

  }


  initForm(): void {
    this.checkOutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required, /*Validators.pattern(/^01[0125][0-9]{8}$/)*/]],
      city: [null, [Validators.required]]
    })
  }


  getCartId(): void {

    this.activedRoute.paramMap.subscribe({
      next: (param) => {
       this.cartId = param.get('id') !
      }
    })

  }

  submitForm(): void {
    // console.log(this.checkOutForm.value)
    // this.cartId
    console.log(this.cartId)

    this.ordersService.checkOutPayMent(this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status === 'success'){
        open(res.session.url , '_self')

        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
