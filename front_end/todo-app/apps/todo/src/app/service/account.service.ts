import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { LocalstorageService } from './localstorage.service'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(private http: HttpClient, private token: LocalstorageService, private router: Router) {}

    login(email: string, password: string) {
        return this.http.post(`${environment.apiUrl}/accounts/login`, { email: email, password: password })
    }

    logout() {
        this.token.removeToken()
        this.router.navigate(['/login'])
    }

    signup(email: string, password: string) {
        return this.http.post(`${environment.apiUrl}/accounts/create`, { email, password })
    }
}
