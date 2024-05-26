import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: "", component: HomeComponent },
    {path: "admin", component: AdminComponent},
    {path: "login", component: LoginComponent},
    {path: "**", redirectTo: ""}
];
