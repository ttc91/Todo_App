import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Task } from '../model/task.model'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    constructor(private http: HttpClient) {}

    createTask(task: Task) : Observable<Task>{
      return this.http.post<Task>(`${environment.apiUrl}/tasks/create`, task);
    }

    getTasksList(listId: string) : Observable<Task[]> {
        return this.http.get<Task[]>(`${environment.apiUrl}/tasks/${listId}`)
    }

    getTaskById(taskId: string) {
        return this.http.get(`${environment.apiUrl}/tasks/${taskId}`)
    }

    updateTaskNote(taskId: string, note: string) {
        return this.http.put(`${environment.apiUrl}/tasks/update-note`, { taskId: taskId, note: note })
    }

    updateTask(task: Task) {
        return this.http.put(`${environment.apiUrl}/tasks/update`, {
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
