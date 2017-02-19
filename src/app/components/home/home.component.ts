import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TweenMax, TweenLite,  Power3, TimelineLite, Back} from 'gsap';
import { Observable } from 'rxjs/Rx'

import 'rxjs';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    private pokemon = new FormControl();
    public pokemons : Array<{name: string, original: string, shadow: string}>;
    private selectedPokemon : any;
    public timeStamp : number = 5;
    private pokemonNumber : number = 0;

    constructor(public element: ElementRef) {
        this.pokemons = [
            {name: 'Pikachu', original: 'pikachu', shadow: 'pikachu_black'},
            {name: 'Slowpoke', original: 'slowpoke', shadow: 'slowpoke_black'},
            {name: 'Bulbasaur', original: 'bulbasaur', shadow: 'bulbasaur_black'},
            {name: 'Gloom', original: 'gloom', shadow: 'gloom_black'},
            {name: 'Vulpix', original: 'vulpix', shadow: 'vulpix_black'}
        ]
    }

    ngOnInit() {
        this.selectedPokemon = this.pokemons[this.pokemonNumber];
        this.showPokemon(this.selectedPokemon.shadow);
        this.animateShadow(this.selectedPokemon.shadow);

        this.pokemon.valueChanges
            .distinctUntilChanged()
            .subscribe((term : string) => {
                if(this.selectedPokemon.name.toLowerCase() == term.toLowerCase()) {
                    this.startCountDown();
                    this.hidePokemon(this.selectedPokemon.shadow);
                    this.hideTitle();
                    this.showPokemon(this.selectedPokemon.original);
                    this.animatePokemon(this.selectedPokemon.original);
                }
            })
    }

    startCountDown() {
        this.element.nativeElement.querySelector('#time-stamp').style.display = 'block';

        Observable
            .interval(1000)
            .take(5)
            .map((x) => x+1)
            .subscribe((x) => {
                this.timeStamp = 5 - x;
                if(this.timeStamp === 0) {
                    this.showNext();
                }
            })
    }

    showNext() {
        this.timeStamp = 5;
        let number = this.getRandomExcept(this.pokemonNumber);
        this.pokemonNumber = number;
        this.element.nativeElement.querySelector('#time-stamp').style.display = 'none';
        this.hidePokemon(this.selectedPokemon.original);
        this.showTitle();
        this.selectedPokemon = this.pokemons[number];
        this.showPokemon(this.selectedPokemon.shadow);
        this.animateShadow(this.selectedPokemon.shadow);
    }

    getRandomExcept(number: Number) {
        let result = Math.floor(Math.random() * (5));
        return  result == number ? this.getRandomExcept(number) : result;
    }

    hideTitle() {
        this.element.nativeElement.querySelector('#pokemon-title').style.display = 'none';
        this.element.nativeElement.querySelector('#pokemon-guess').style.display = 'block';
    }

    showTitle() {
        this.element.nativeElement.querySelector('#pokemon-title').style.display = 'block';
        this.element.nativeElement.querySelector('#pokemon-guess').style.display = 'none';
    }

    showPokemon(id) {
        this.element.nativeElement.querySelector('#' + id).style.display = 'block';
    }

    hidePokemon(id){
        this.element.nativeElement.querySelector('#' + id).style.display = 'none';
    }

    animateShadow(id) {
        var tl = new TimelineLite({onUpdate:this.onUpdate});
        tl
            .from('#' + id, 2, {rotation:1440, transformOrigin:"50% 50%", scale: 0, opacity: 0.5, ease: Power3.easeOut})
            .staggerFrom(".letter", 1, {rotation:180, y:-80, ease: Back.easeOut}, 0.05, '-=2');
    }

    animatePokemon(id) {
        var tl = new TimelineLite();
        tl
            .from('#' + id, 2, {transformOrigin:"50% 50%", scale: 0.5, opacity: 0.5, ease: Back.easeOut})
            .staggerFrom(".letter", 1, {rotation:180, y:-80, ease: Back.easeOut}, 0.05, '-=3');
    }

    onUpdate() {

    }

}