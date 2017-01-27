import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { PokePowahComponent } from './components/poke-powah/poke-powah.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import '../../node_modules/milligram/dist/milligram.min.css';
import './global.css';

@NgModule({
    bootstrap: [ NavigationComponent ],
    declarations: [
        NavigationComponent,
        HomeComponent,
        PokePowahComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ]
})


export class AppModule {

}