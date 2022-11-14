import { Component, OnInit } from '@angular/core'
import { TaskService } from '../../service/task.service'
import { ActivatedRoute, Params } from '@angular/router'
import { Task } from '../../model/task.model'
@Component({
    selector: 'todo-task',
    templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
    selectedListId = ''
    tasks: Task[] = []
    selectedTask = null
    constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['listId']) {
                this.selectedListId = params['listId']
                this.taskService.getTasksOfList(params['listId']).subscribe(
                    (response: any) => {
                        this.tasks = response.tasks
                        console.log(this.tasks)
                    },
                    (err) => {}
                )
            }
            this.selectedTask = null
        })
    }
}
