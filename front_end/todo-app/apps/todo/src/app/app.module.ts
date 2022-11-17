import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { LoginPageComponent } from './pages/login-page/login-page.component'

import { RouterModule, Routes } from '@angular/router'
import { HeaderComponent } from './shared/header/header.component'
import { FooterComponent } from './shared/footer/footer.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { SidebarComponent } from './shared/sidebar/sidebar.component'
import { ShellComponent } from './shared/shell/shell.component'
import { EndemicListComponent } from './shared/endemic-list/endemic-list.component'
import { PersonalListComponent } from './shared/personal-list/personal-list.component'
import { TaskComponent } from './shared/task/task.component'
import { SearchComponent } from './shared/search/search.component'
import { TaskDetailComponent } from './shared/task-detail/task-detail.component'
import { AuthGuardService } from './service/auth-guard.service'
import { JwtInterceptor } from './service/jwt.interceptor'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ToastModule } from 'primeng/toast'
import { SignupPageComponent } from './pages/signup-page/signup-page.component'
import { FormsModule } from '@angular/forms'
import { DragDropModule } from '@angular/cdk/drag-drop'

const routes: Routes = [

    { path: 'login', component: LoginPageComponent },
    { path: 'signup', component: SignupPageComponent },
    {
        path: '',
        component: HomePageComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'tasks/:listId',
                component: TaskComponent,
                children:
                [
                  { path: 'id/:taskId',
                    component: TaskDetailComponent
                  }
                ],
            },
        ],
    },
]

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        HeaderComponent,
        FooterComponent,
        HomePageComponent,
        SidebarComponent,
        ShellComponent,
        EndemicListComponent,
        PersonalListComponent,
        TaskComponent,
        SearchComponent,
        TaskDetailComponent,
        SignupPageComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        ConfirmDialogModule,
        ToastModule,
        FormsModule,
        DragDropModule
    ],
    providers: [MessageService, ConfirmationService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
