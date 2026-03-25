import { Routes } from '@angular/router';
import { HomeComponent } from './Layout/Pages/home/home.component';
import { ProductsComponent } from './Layout/Pages/products/products.component';
import { CartComponent } from './Layout/Pages/cart/cart.component';
import { LogInComponent } from './Layout/Pages/log-in/log-in.component';
import { RegisterComponent } from './Layout/Pages/register/register.component';
import { BrandsComponent } from './Layout/Pages/brands/brands.component';
import { CategoriesComponent } from './Layout/Pages/categories/categories.component';
import { NotFoundComponent } from './Layout/Additions/not-found/not-found.component';

export const routes: Routes = [
{path:"", redirectTo: "home", pathMatch: "full"},
{path:"home", title: "Home" ,component: HomeComponent},
{path:"products", title: "Products" ,component: ProductsComponent},
{path:"cart", title: "Cart" ,component: CartComponent},
{path:"login", title: "Login" ,component: LogInComponent},
{path:"register", title: "Register" ,component: RegisterComponent},
{path:"brands", title: "Brands" ,component: BrandsComponent},
{path:"categories", title: "Categories" ,component: CategoriesComponent},
{path:"**", title: "Not Found" ,component: NotFoundComponent}  









];
