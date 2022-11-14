import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Task } from '../model/task.model'

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    constructor(private http: HttpClient) {}

    getTasksOfList(listId: string) {
        return this.http.get(`${environment.apiUrl}/tasks/get_all/${listId}`)
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
