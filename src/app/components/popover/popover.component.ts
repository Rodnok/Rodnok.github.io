import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'popover',
    template: `
    <ul>
      <li *ngFor="let item of items"><a [routerLink]="item.link">{{item.name}}</a></li>
    </ul>
    `
})

export class PopoverComponent implements OnInit {

    @Input() items;

    ngOnInit() {
        console.log('Hello from Popover ', this.items);
    }

}