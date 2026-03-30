import { Routes } from '@angular/router';
import { HomeComponent } from './Layout/Pages/home/home.component';
import { ProductsComponent } from './Layout/Pages/products/products.component';
import { CartComponent } from './Layout/Pages/cart/cart.component';
import { LogInComponent } from './Layout/Pages/log-in/log-in.component';
import { RegisterComponent } from './Layout/Pages/register/register.component';
import { BrandsComponent } from './Layout/Pages/brands/brands.component';
import { CategoriesComponent } from './Layout/Pages/categories/categories.component';
import { NotFoundComponent } from './Layout/Additions/not-found/not-found.component';
import { authGuard } from './Shared/Auth/auth.guard';
import { preserveTokenGuard } from './Shared/preserveToken/preserve-token.guard';
import { ForgetPasswordComponent } from './Layout/Additions/forget-password/forget-password.component';

export const routes: Routes = [
{path:"", redirectTo: "home", pathMatch: "full"},
{path:"home", title: "Home" ,component: HomeComponent},
{path:"products", title: "Products" ,component: ProductsComponent},
{path:"cart", title: "Cart" , canActivate: [authGuard], component: CartComponent},
{path:"login", title: "Login" , canActivate: [preserveTokenGuard], component: LogInComponent},
{path:"forgetPassword", title: "Forget Password" ,component: ForgetPasswordComponent},
{path:"register", title: "Register", canActivate: [preserveTokenGuard] ,component: RegisterComponent},
{path:"brands", title: "Brands" ,component: BrandsComponent},
{path:"categories", title: "Categories" ,component: CategoriesComponent},
{path:"**", title: "Not Found" ,component: NotFoundComponent}  









];
