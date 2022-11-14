import { Component, OnInit } from '@angular/core'
import { AccountService } from '../../service/account.service'
import { Router } from '@angular/router'
import { MessageService, ConfirmationService } from 'primeng/api'
@Component({
    selector: 'todo-app-signup-page',
    templateUrl: './signup-page.component.html',
    styles: [],
})
export class SignupPageComponent implements OnInit {

    constructor(
        private accountService: AccountService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {}

    signup(email: string, password: string, passwordConfirm: string) {
        if (password !== passwordConfirm) {
            this.messageService.add({
                severity: 'error',
                summary: '',
                detail: 'Password confirm must match password !',
            })
        }
        this.accountService.signup(email, password).subscribe(
            (response: any) => {
                this.confirmationService.confirm({
                    message: `Do you want to go to the login page ?`,
                    header: 'Sign up successfully !',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        this.router.navigate(['/login'])
                    },
                    reject: () => {
                        return
                    },
                })
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: '',
                    detail: 'Error when sign up please try again !',
                })
            }
        )
    }
}
