import { Component, OnInit } from '@angular/core'
import { TaskService } from '../../service/task.service'
import { ActivatedRoute } from '@angular/router'
import { Task } from '../../model/task.model'
@Component({
    selector: 'todo-task',
    templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {

    taskName  = '';
    isImportant  = false;

    listId = '';
    tasks: Task[] = [];

    constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {

        this.activatedRoute.params.subscribe(paramsId => {
          this.listId = paramsId['listId'];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this.taskService.getTasksList(this.listId).subscribe((response: any) => {
              this.tasks = response.tasks;
          });
        })

    }

    setImportant () {
      this.isImportant == false ? this.isImportant = true : this.isImportant = false;
      console.log(this.isImportant);
    }

    createTask() {
      const check = this.taskName?.length == 0;
      if(check){
        return;
      }

      const task : Task = {
        taskName: this.taskName,
        isImportant: this.isImportant,
        _id: '',
        note: '',
        isCompleted: false,
        deadline: null,
        list: this.listId,
        isToday: false
      }

      this.taskService.createTask(task).subscribe();
      this.isImportant = false;
      this.taskName = '';
      this.ngOnInit();

    }

    updateTaskIsCompleted(taskId: string, isCompleted: boolean) {

      isCompleted == true ? isCompleted = false : isCompleted = true;

      this.taskService.updateTaskIsCompleted(taskId, isCompleted).subscribe();
      this.ngOnInit();
    }

    updateTaskIsImportant(taskId: string, isImportant: boolean) {

      isImportant == true ? isImportant = false : isImportant = true;

      this.taskService.updateTaskIsImportant(taskId, isImportant).subscribe();
      this.ngOnInit();
    }

}
