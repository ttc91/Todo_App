import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ShellComponent } from './shared/shell/shell.component';
import { EndemicListComponent } from './shared/endemic-list/endemic-list.component';
import { PersonalListComponent } from './shared/personal-list/personal-list.component';
import { TaskComponent } from './shared/task/task.component';
import { SearchComponent } from './shared/search/search.component';
import { TaskDetailComponent } from './shared/task-detail/task-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent },
  {
    path: '',
    component: ShellComponent,
    children: [{ path: 'task', component: TaskComponent }],
  },
  {
    path: 'task-detail',
    component: TaskDetailComponent
  },
  { path: 'task-test', component: TaskComponent },
  { path: 'login', component: LoginPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
