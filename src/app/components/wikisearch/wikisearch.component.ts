import { Component, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import {URLSearchParams, Jsonp} from '@angular/http';
import {FormControl} from '@angular/forms';

import 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';

@Component({
    selector: 'wikisearch',
    templateUrl: './wikisearch.component.html',
    styleUrls: ['./wikisearch.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class WikisearchComponent {
    private search = new FormControl();
    private WIKIPEDIA_URL = 'https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK';
    private results;
    private hasResults = false;

    constructor(private jsonp: Jsonp) {
    }

    ngOnInit() {
        console.log('hello `Wikipedia` component');
        // slow down calls          .debounceTime(2000)
        // avoid same requests      .distinctUntilChanged()
        // cancel pending requests  .switchMap
        // retry if fails           .retryWhen(errors => errors.delay(5000))

        this.results = this.search.valueChanges
            .debounceTime(2000)
            .distinctUntilChanged()
            .switchMap(term => {
                console.log(`Querying [${term}]...`);
                return this.jsonp
                    .get(this.WIKIPEDIA_URL, searchParams(term))
                    .retryWhen(errors => errors.delay(3000))
                    .map(response => {
                        let results = formatResults(response);
                        this.hasResults = results.length > 0;
                        console.log(`> Results for [${term}]: ${results.length}`);
                        return results;
                    });
            });

        function searchParams(term) {
            let params = new URLSearchParams();
            params.append('action', 'opensearch');
            params.append('search', encodeURIComponent(term));
            params.append('format', 'json');
            return {
                search: params
            };
        }

        function formatResults(response) {
            let results = response.json();
            if (results.hasOwnProperty("error") && results.error.code === "nosearch") return [];
            return results[1].map((value, index) =>
                ({
                    title: value,
                    url: results[3][index]
                })
            );
        }

    }

    ngOnDestroy() {
        console.log('sayonara `Wikipedia` component');
        // clean-up
        this.results.unsubscribe();
    }

    private open(url) {
        window.open(url, '_blank');
    }
}