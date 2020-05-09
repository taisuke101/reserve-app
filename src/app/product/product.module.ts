import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-listings/product-listings.component';
import { ProductComponent } from './product.component';
import { ProductService } from './shared/product.service';
import { AuthGuard } from '../auth/shared/auth.guard';


const routes: Routes = [
    {
        path: 'product', component: ProductComponent,
        children: [
            { path: '', component: ProductListComponent },
            { path: ':productId', component: ProductDetailComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    declarations: [
        ProductDetailComponent,
        ProductListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    providers: [
        ProductService
    ],
    bootstrap: []
})
export class ProductModule {}