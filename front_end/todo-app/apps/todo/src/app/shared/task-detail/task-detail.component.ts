import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Step } from '../../model/step.model'
import { Task } from '../../model/task.model'
import { StepService } from '../../service/step.service'
import { TaskService } from '../../service/task.service'
import { MessageService, ConfirmationService } from 'primeng/api'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
@Component({
    selector: 'todo-task-detail',
    templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent implements OnInit {
    addStep = ''
    task: Task = new Task()
    steps: Step[] = []
    constructor(
        private taskService: TaskService,
        private stepService: StepService,
        private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['taskId']) {
                this.taskService.getTaskById(params['taskId']).subscribe(
                    (response: any) => {
                        this.task = response.task
                    },
                    (err) => {}
                )
                this.stepService.getStepsOfTask(params['taskId']).subscribe(
                    (response: any) => {
                        this.steps = response.lstStep
                    },
                    (err) => {}
                )
            }
        })
    }

    updateTaskNote(id: string) {
        this.taskService.updateTaskNote(id, this.task.note).subscribe(
            (res) => {},
            (err) => {}
        )
    }

    updateDeadline(value: string) {
        if (value !== '') {
            const deadline = new Date(value)
            this.task.deadline = deadline
        } else this.task.deadline = null

        this.taskService.updateTask(this.task).subscribe(
            (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Update deadline success!',
                })
            },
            (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Try again !',
                })
            }
        )
    }

    drop(event: CdkDragDrop<Step[]>) {
        // moveItemInArray(this.steps, event.previousIndex, event.currentIndex)
        // 1 2 3 4 5
        // 1 3 4 2 5
        //Move down
        if (event.previousIndex < event.currentIndex) {
            const temp = this.steps[event.currentIndex].priority
            for (let i = event.currentIndex; i > event.previousIndex; i--) {
                this.steps[i].priority = this.steps[i - 1].priority
            }
            this.steps[event.previousIndex].priority = temp
        } else {
            //move up -> pre > cur
            if (event.previousIndex > event.currentIndex) {
                const temp = this.steps[event.currentIndex].priority
                for (let i = event.currentIndex; i < event.previousIndex; i++) {
                    this.steps[i].priority = this.steps[i + 1].priority
                }
                this.steps[event.previousIndex].priority = temp
            }
        }
        //Call update api
        this.stepService.updateListSteps(this.steps).subscribe(
            (res) => {
                console.log(res)
            },
            (err) => {
                console.log('ERROR' + err)
            }
        )
        // //sort
        this.steps = this.steps.sort((a, b) => {
            return a.priority - b.priority
        })
    }
    inputStepNameChange(id: string) {
        this.stepService.updateStep(this.steps.filter((x) => x._id === id)[0]).subscribe(
            (res) => {},
            (err) => {}
        )
    }

    reverseStepStatus(id: string) {
        this.stepService.reverseStepStatus(id).subscribe(
            (res) => {
                this.steps = this.steps.map((step) => {
                    if (step._id === id) {
                        step.isCompleted = !step.isCompleted
                    }
                    return step
                })
            },
            (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Try again !',
                })
            }
        )
    }
    onAddstepClick() {
        this.stepService.addStep(this.task._id, this.addStep).subscribe(
            (res: any) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Add step success !',
                })
                this.steps.push(res.step)
            },
            (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Add step fail !',
                })
            }
        )
    }

    onDeleteStepClick(id: string) {
        const step = this.steps.filter((x) => x._id === id)[0]
        this.confirmationService.confirm({
            message: `Do you want to delete ${step.stepName} ?`,
            header: 'Delete step',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.stepService.deleteStep(id).subscribe(
                    (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Step is deleted successfully!',
                        })
                        this.steps = this.steps.filter((x) => x._id !== id)
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error: ' + error.message,
                            detail: 'Step is not deleted !',
                        })
                    }
                )
            },
            reject: () => {
                return
            },
        })
    }

    toDatimeLocal(date: Date | null): string {
        if (date) {
            date = new Date(date)
            //yyyy-MM-ddThh:mm
            const year = date.getFullYear().toString()
            const month = date.getMonth().toString()
            const day = date.getDate().toString()
            let hh = date.getHours().toString()
            if (hh.length === 1) hh = '0' + hh
            let mm = date.getMinutes().toString()
            if (mm.length === 1) mm = '0' + mm

            return `${year}-${month}-${day}T${hh}:${mm}`
        }
        return ''
    }
}
