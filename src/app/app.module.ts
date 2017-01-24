import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from './components/main/main.component.ts';
import '../../node_modules/milligram/dist/milligram.min.css';

@NgModule({
    bootstrap: [ MainComponent ],
    declarations: [
        MainComponent
    ],
    imports: [
        BrowserModule
    ]
})

export class AppModule {

}