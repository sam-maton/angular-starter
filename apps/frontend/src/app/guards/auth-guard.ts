import { CanActivateFn, RedirectCommand } from '@angular/router';
import { authClient } from '../../lib/auth-client';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const { data, error } = await authClient.getSession();
  if (error || !data?.session) {
    const loginUrl = router.parseUrl('/login');
    return new RedirectCommand(loginUrl, {
      replaceUrl: true,
    });
  }
  return true;
};
