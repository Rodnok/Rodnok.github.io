import { Component, Type } from '@angular/core';
import { PopoverComponent } from './components/popover/popover.component';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent extends Type {
    public menuItems = [
        { name: 'PokePowah', link: 'poke-powah' },
        { name: 'Wikisearch', link: 'wikisearch' }
    ];
}