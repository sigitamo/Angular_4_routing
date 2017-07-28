import { 
        CanActivate, 
        ActivatedRouteSnapshot, 
        RouterStateSnapshot,
        Router,
        CanActivateChild 
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard  implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService,
                private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthentificated()
                    .then(
                        (authentificated: boolean) => {
                            if(authentificated) {
                                return true;
                            } else {
                                this.router.navigate(['/']);
                            }
                        }
                        );
                    
    }
    canActivateChild(route: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}