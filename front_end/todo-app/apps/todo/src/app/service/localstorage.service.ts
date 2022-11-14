import { Injectable } from '@angular/core'

const TOKEN = 'token'

@Injectable({
    providedIn: 'root',
})

export class LocalstorageService {

  setToken(data: string) {
    localStorage.setItem(TOKEN, data);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  removeToken(){
    localStorage.removeItem(TOKEN);
  }

}
