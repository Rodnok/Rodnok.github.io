import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { NgTableComponent, NgTableFilteringDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';


@Component({
    selector: 'poke-powah',
    templateUrl: './poke-powah.component.html',
    styleUrls: ['./poke-powah.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PokePowahComponent {
    public rows:Array<any> = [];
    public columns:Array<any> = [
        {title: 'ID', name: 'ID'},
        {title: 'Name', name: 'Name'},
        {title: 'Stamina', name: 'Base Stamina'},
        {title: 'Attack', name: 'Base Attack'},
        {title: 'Defence', name: 'Base Defense'},
        {title: 'Max CP', className: 'text-warning', name: 'Max CP'}
    ];

    public config:any = {
        sorting: {columns: this.columns},
        className: ['table-striped', 'table-bordered']
    };

    constructor(http: Http) {
        let url = require('./poke.json');

        http.get(url)
            .map(res => res.json())
            .subscribe(data => this.rows = data);
    }

    ngOnInit() {
        console.log('Hello from pokePowah');
    }

    public changeFilter(data:any, config:any):any {
        let filteredData:Array<any> = data;
        this.columns.forEach((column:any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item:any) => {
                    return String(item[column.name]).match(column.filtering.filterString);
                });
            }
        });

        if (!config.filtering) {
            return filteredData;
        }

        if (config.filtering.columnName) {
            return filteredData.filter((item:any) =>
                String(item[config.filtering.columnName]).match(this.config.filtering.filterString));
        }

        let tempArray:Array<any> = [];
        filteredData.forEach((item:any) => {
            let flag = false;
            this.columns.forEach((column:any) => {
                if (item[column.name].toString().match(this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;

        return filteredData;
    }


    public changeSort(data:any, config:any):any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName:string = void 0;
        let sort:string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        return data.sort((previous:any, current:any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public onChangeTable(config:any):any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.rows, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = sortedData;
    }

    public onCellClick(data: any): any {
        console.log(data);
    }
}