import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'

import { List } from '../model/list.model'

@Injectable({
    providedIn: 'root',
})
export class ListService {
    constructor(private http: HttpClient) {}

    getUserLists(): Observable<List[]> {
        return this.http.get<List[]>(`${environment.apiUrl}/lists/get_all`)
    }

    createList(list: List) {
      return this.http.post(`${environment.apiUrl}/lists/create`, list);
    }

    updateList(list: List) {
        return this.http.put(`${environment.apiUrl}/lists/update`, list);
    }

    
    deleteList(id: string) {
        return this.http.delete(`${environment.apiUrl}/lists/${id}`);
    }
}
