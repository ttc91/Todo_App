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
}
