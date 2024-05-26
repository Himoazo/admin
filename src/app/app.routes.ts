import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {path: "", component: HomeComponent },
    {path: "admin", component: AdminComponent, canActivate: [authGuard]},
    {path: "login", component: LoginComponent},
    {path: "**", redirectTo: ""}
];
