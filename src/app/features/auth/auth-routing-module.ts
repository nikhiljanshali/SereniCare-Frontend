import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Signin } from './auth/page/signin/signin';
import { Signup } from './auth/page/signup/signup';
import { Resetpassword } from './auth/page/resetpassword/resetpassword';
import { AuthLayout } from './auth/auth-layout/auth-layout';
import { Forgetpassword } from './auth/page/forgetpassword/forgetpassword';
import { Unauthorized } from '../../shared/component/unauthorized/unauthorized';

const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'signin', component: Signin },
      { path: 'signup', component: Signup },
      { path: 'reset-password', component: Resetpassword },
      { path: 'forget-password', component: Forgetpassword },
      // ✅ Unauthorized route
      {
        path: 'unauthorized',
        component: Unauthorized,
        // loadComponent: () => import('./../../shared/component/unauthorized/unauthorized').then(m => m.Unauthorized)
      },
      { path: '', redirectTo: 'signin', pathMatch: 'full' }
    ]
  },

  // Optional: wildcard fallback
  { path: '**', redirectTo: 'signin' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
