import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'
import { LocalstorageService } from './localstorage.service'

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService {

    constructor(private router: Router, private localStorageToken: LocalstorageService) {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.localStorageToken.getToken()

        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]))
            if (!this._tokenExpired(tokenDecode.exp)) return true
        }

        this.router.navigate(['/login'])
        return false
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _tokenExpired(expiration: any): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration
    }

}
