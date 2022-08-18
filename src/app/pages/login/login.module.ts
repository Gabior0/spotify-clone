import { loginRoutes } from './login.routes';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(loginRoutes)],
})
export class LoginModule {}
