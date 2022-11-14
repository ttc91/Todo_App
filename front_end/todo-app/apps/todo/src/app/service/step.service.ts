import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Step } from '../model/step.model'

@Injectable({
    providedIn: 'root',
})
export class StepService {
    constructor(private http: HttpClient) {}

    getStepsOfTask(taskId: string) {
        return this.http.get(`${environment.apiUrl}/steps/${taskId}`)
    }

    updateListSteps(steps: Step[]) {
        return this.http.put(`${environment.apiUrl}/steps/all`, {steps: steps})
    }

    reverseStepStatus(stepId: string) {
        return this.http.put(`${environment.apiUrl}/steps/change-status/${stepId}`, {})
    }

    updateStep(step: Step) {
        return this.http.put(`${environment.apiUrl}/steps`, { stepId: step._id, stepName: step.stepName, priority: step.priority })
    }

    addStep(taskId: string, stepName: string) {
        return this.http.post(`${environment.apiUrl}/steps`, { taskId, stepName })
    }

    deleteStep(stepId: string) {
        return this.http.delete(`${environment.apiUrl}/steps/${stepId}`)
    }
}
