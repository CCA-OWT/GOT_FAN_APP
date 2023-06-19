import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';

import {AuthenticationService} from './authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isUserLoggedIn()) {
    return true;
  }

  return router.navigateByUrl("/login");
};
