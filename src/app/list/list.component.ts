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

  constructor() { }

  ngOnInit() {
    // I have saved the values of the unselcted and selected providers in localStorage 
    // and checking if the values are already present in localStorage and 
    // I am resetting the values of both the unselected and selected Providers. 
    // This will be helpful to restore the values of the unselected and selected providers 
    // even after there is a refresh on the page.
    if (JSON.parse(localStorage.getItem('selectedProviders')) || JSON.parse(localStorage.getItem('unSelectedProviders'))) {
      this.selectedProviders = JSON.parse(localStorage.getItem('selectedProviders'));
      this.unselectedProviders = JSON.parse(localStorage.getItem('unSelectedProviders'));
      // The below condition is to set the default values of unselected and selected providers to 
      // empty array if selected or unselcted values are not present in the localstorage.
      // If this condition is not used the html will break as the value will be null in localStorage
      // if no values are present in it.
      if (!this.selectedProviders) {
        this.selectedProviders = [];
      } else if (!this.unselectedProviders) {
        this.unselectedProviders = []
      }
    }
  }

  // In the below functions toSelectedProviders and toUnSelectedProviders I am pushing the values
  // selected from selected to unselected and vice versa depedning on the user selection. 
  // After pushing the values into the respective arrays I am setting these updated array values
  // into the respective localstorage. From Html i am sending the row value on which the user
  // selected and performing the actions.
  toSelectedProviders(row) {
    this.selectedProviders.push(row);
    for (var i = 0; i < this.unselectedProviders.length; i++) {
      if (this.unselectedProviders[i].id === row.id) {
        this.unselectedProviders.splice(i, 1);
      }
    }
    window.localStorage.setItem('selectedProviders', JSON.stringify(this.selectedProviders));
    window.localStorage.setItem('unSelectedProviders', JSON.stringify(this.unselectedProviders));
  }
  toUnSelectedProviders(row) {
    this.unselectedProviders.push(row);
    for (var i = 0; i < this.selectedProviders.length; i++) {
      if (this.selectedProviders[i].id === row.id) {
        this.selectedProviders.splice(i, 1);
      }
    }
    window.localStorage.setItem('unSelectedProviders', JSON.stringify(this.unselectedProviders));
    window.localStorage.setItem('selectedProviders', JSON.stringify(this.selectedProviders));
  }
}
