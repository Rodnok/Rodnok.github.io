import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home.component';

@NgModule({
    bootstrap: [ HomeComponent ],
    declarations: [
        HomeComponent
    ],
    imports: [
        BrowserModule
    ]
})

export class AppModule {

}