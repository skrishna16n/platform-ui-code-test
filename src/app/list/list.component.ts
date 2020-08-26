import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public selectedProviders = [];
  public unselectedProviders = [
    {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    },
    {
      id: '2',
      name: 'Mary',
      address: '443 Windwhisper Road',
      phone: '2233211903'
    },
    {
      id: '3',
      name: 'Jason',
      address: '9992 Pumpkin Hollow',
      phone: '4343219384'
    }
  ];

  constructor() {}

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('selectedProviders')) || JSON.parse(localStorage.getItem('unSelectedProviders'))) {
      this.selectedProviders = JSON.parse(localStorage.getItem('selectedProviders'));
      this.unselectedProviders = JSON.parse(localStorage.getItem('unSelectedProviders'));
      if (!this.selectedProviders) {
        this.selectedProviders = [];
      } else if (!this.unselectedProviders) {
        this.unselectedProviders = []
      }
    }
  }

  toSelectedProviders(row) {
    this.selectedProviders.push(row);
    for (var i = 0; i < this.unselectedProviders.length; i++) {
      if (this.unselectedProviders[i].id === row.id) {
        this.unselectedProviders.splice(i, 1);
      }
    }
    window.localStorage.setItem('selectedProviders', JSON.stringify(this.selectedProviders));
    window.localStorage.setItem('unSelectedProviders',JSON.stringify(this.unselectedProviders));
  }

  toUnSelectedProviders(row) {
    this.unselectedProviders.push(row);
    for (var i = 0; i < this.selectedProviders.length; i++) {
      if (this.selectedProviders[i].id === row.id) {
        this.selectedProviders.splice(i, 1);
      }
    }
    window.localStorage.setItem('unSelectedProviders', JSON.stringify(this.unselectedProviders));
    window.localStorage.setItem('selectedProviders',JSON.stringify(this.selectedProviders));
  }
}
