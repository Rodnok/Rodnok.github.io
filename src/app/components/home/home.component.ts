import { Component, OnInit } from '@angular/core';
import { TweenMax, Power4 } from 'gsap';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {

    ngOnInit() {
        TweenMax.to("#foo", 1, { x: 100, ease: Power4.easeOut });
        //CustomEase.create("hop", "M0,0.005 C0,0.005 0.056,0.445 0.175,0.445 0.294,0.445 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0");
        //TweenLite.to(".logo", 2, { ease: "hop", scale:1.5, rotation:30 });
    }

}