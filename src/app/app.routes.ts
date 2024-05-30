import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { PersonnelComponent } from './personnel/personnel.component';

export const routes: Routes = [
    {path: "", component: LoginComponent },
    {path: "admin", component: AdminComponent, canActivate: [authGuard],
    children: [
        { path: "menu", component: MenuComponent, canActivate: [authGuard] },
        {path: "orders", component: OrdersComponent, canActivate: [authGuard]},
        {path: "personnel", component: PersonnelComponent, canActivate: [authGuard]}
    ]},
    {path: "login", component: LoginComponent},
    {path: "**", redirectTo: ""}
];
