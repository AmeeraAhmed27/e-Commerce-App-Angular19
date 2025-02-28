import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { ICategory } from '../../shared/interfaces/icategory';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService)
  getCategories!:Subscription
  categories!:ICategory[]
  
  ngOnInit(): void {
    this.getCategories = this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categories= res.data
      },
      error:(err)=>{
        console.log(err)
      }

    })
    
  }
}
