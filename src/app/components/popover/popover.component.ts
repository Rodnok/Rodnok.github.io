import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'popover',
    template: `
    <div (click)="triggerOpen($event)"><ng-content></ng-content></div>
    <ul *ngIf="trigger">
      <li *ngFor="let item of items"><a [routerLink]="item.link">{{item.name}}</a></li>
    </ul>
    `,
    host: {
        '(document: click)': 'onClick($event)'
    }
})

export class PopoverComponent implements OnInit {
    @Input() items;
    private trigger:boolean;

    onClick(event) {
        this.trigger = false;
    }

    triggerOpen(event) {
        event.stopPropagation();
        this.trigger = !this.trigger;
    }

    ngOnInit() {
        console.log('Hello from Popover ', this.items);
    }

}