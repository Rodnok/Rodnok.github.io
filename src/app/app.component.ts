import { Component, Type, ViewEncapsulation } from '@angular/core';
import { PopoverComponent } from './components/popover/popover.component';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styles: [require('./app.component.scss')],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent extends Type {
    public menuItems = [
        { name: 'PokePowah', link: 'poke-powah' },
        { name: 'Wikisearch', link: 'wikisearch' }
    ];
}