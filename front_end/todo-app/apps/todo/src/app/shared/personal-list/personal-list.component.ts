import { Component, OnInit } from '@angular/core'
import { List } from '../../model/list.model'
import { ListService } from '../../service/list.service'

@Component({
    selector: 'todo-personal-list',
    templateUrl: './personal-list.component.html',
})
export class PersonalListComponent implements OnInit {
    lists: List[] = []

    constructor(private listService: ListService) {}

    ngOnInit(): void {
        this.listService.getUserLists().subscribe(
            (response: any) => {
                this.lists = response.lists
            },
            (err) => {}
        )
    }

    createList(listName: string) : void{

      const list : List = {
        listName: listName
      };
      listName = "";

      this.listService.createList(list).subscribe();
      this.ngOnInit();
    }
}
