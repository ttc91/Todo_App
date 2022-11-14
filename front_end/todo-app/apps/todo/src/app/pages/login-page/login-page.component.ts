import { Component, OnInit } from '@angular/core'
import { LocalstorageService } from '../../service/localstorage.service'
import { AccountService } from '../../service/account.service'
import { Router } from '@angular/router'
import { MessageService, ConfirmationService } from 'primeng/api'
@Component({
    selector: 'todo-login-page',
    templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
    constructor(
        private accountService: AccountService,
        private localStorageService: LocalstorageService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {}

    login(email: string, password: string) {
        this.accountService.login(email, password).subscribe(
            (response: any) => {
                this.localStorageService.setToken(response.token)
                this.router.navigate(['/home'])
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: '',
                    detail: 'Email or password is wrong !',
                })
            }
        )
    }
}
