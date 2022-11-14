import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    constructor(private http: HttpClient) {}

    getTasksOfList(listId: string) {
        return this.http.get(`${environment.apiUrl}/tasks/get_all/${listId}`)
    }
}
