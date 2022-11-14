import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { List } from '../../model/list.model'
import { ListService } from '../../service/list.service'

@Component({
    selector: 'todo-personal-list',
    templateUrl: './personal-list.component.html',
})
export class PersonalListComponent implements OnInit {
    lists: List[] = []

    constructor(private listService: ListService, private router: Router) { }

    ngOnInit(): void {
        this.listService.getUserLists().subscribe(
            (response: any) => {
                this.lists = response.lists
            },
            (err) => { }
        )
    }

    createList(listName: string): void {

        const list: List = {
            listName: listName
        };
        listName = "";

        this.listService.createList(list).subscribe(() => {
            this.ngOnInit();
        });
    }

    deleteList(id: string): void {
        this.listService.deleteList(id).subscribe(() => {
            this.ngOnInit();
        });
    }

    updateList(listName: string, id: string): void {
        const list: List = {
            _id: id,
            listName: listName
        }
        this.listService.updateList(list).subscribe(() => {
            this.ngOnInit();
        })
    }
}
