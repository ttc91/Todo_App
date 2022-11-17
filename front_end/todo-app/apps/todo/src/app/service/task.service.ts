import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Task } from '../model/task.model'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    constructor(private http: HttpClient) {}

    createTask(task: Task): Observable<Task> {
        return this.http.post<Task>(`${environment.apiUrl}/tasks/create`, task)
    }

    deleteTask(id: string) {
        return this.http.delete(`${environment.apiUrl}/tasks/${id}`)
    }

    getTasksList(listId: string): Observable<Task[]> {
        return this.http.get<Task[]>(`${environment.apiUrl}/tasks/${listId}`)
    }

    updateTaskIsCompleted(taskId: string, isCompleted: boolean): Observable<Task> {
        const task: Task = {
            _id: taskId,
            isCompleted: isCompleted,
            note: '',
            deadline: null,
            list: '',
            isImportant: false,
            isToday: false,
        }
        return this.http.post<Task>(`${environment.apiUrl}/tasks/update/is_complete`, task)
    }

    updateTaskIsImportant(taskId: string, isImportant: boolean): Observable<Task> {
        const task: Task = {
            _id: taskId,
            isImportant: isImportant,
            note: '',
            deadline: null,
            list: '',
            isCompleted: false,
            isToday: false,
        }
        return this.http.post<Task>(`${environment.apiUrl}/tasks/update/is_important`, task)
    }

    getTaskById(taskId: string): Observable<Task> {
        return this.http.get<Task>(`${environment.apiUrl}/tasks/get/${taskId}`)
    }

    updateTaskNote(taskId: string, note: string) {
        return this.http.put(`${environment.apiUrl}/tasks/update-note`, { _id: taskId, note: note })
    }

    updateTask(task: Task): Observable<Task> {
        return this.http.put<Task>(`${environment.apiUrl}/tasks/update`, {
            id: task._id,
            taskName: task.taskName,
            note: task.note,
            isCompleted: task.isCompleted,
            isImportant: task.isImportant,
            isToday: task.isToday,
            deadline: task.deadline,
            remindAt: task.remindAt,
            file: task.file,
        })
    }
}
