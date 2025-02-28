import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  private readonly _BrandsService = inject(BrandsService)
  getBrands!:Subscription
  brands!:Ibrands[]
  


  ngOnInit(): void {
    this.getBrands = this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.brands= res.data
      },
      error:(err)=>{
        console.log(err)
      }

    })
    
  }




}
