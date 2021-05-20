import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  pictures = [
    {value: "Vacation", image: "./assets/images/vacation.jpg"},
    {value: "Emergency", image: "./assets/images/emergency.jpg"},
    {value: "Retirement", image: "./assets/images/retirement.jpg"},
    {value: "Investment", image: "./assets/images/investment.jpg"},
    {value: "Big Purchases", image: "./assets/images/bigpurchase.jpg"},
  ]

  constructor() { }

  getAllPictures(): any {
    return this.pictures;
  }
}
