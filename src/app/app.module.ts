import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PokePowahComponent } from './components/poke-powah/poke-powah.component';
import { WikisearchComponent } from './components/wikisearch/wikisearch.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PopoverComponent } from './components/popover/popover.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { appRoutes } from './app.routes';
import '../../node_modules/milligram/dist/milligram.min.css';
import './global.css';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        HomeComponent,
        PokePowahComponent,
        WikisearchComponent,
        NotFoundComponent,
        PopoverComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, {useHash: true, preloadingStrategy: PreloadAllModules})
    ]
})


export class AppModule {

}