import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
    {path: "", component: HomeComponent },
    {path: "admin", component: AdminComponent, canActivate: [authGuard],
    children: [
        { path: "menu", component: MenuComponent, canActivate: [authGuard] },
        {path: "orders", component: OrdersComponent, canActivate: [authGuard]}
    ]},
    {path: "login", component: LoginComponent},
    {path: "**", redirectTo: ""}
];
