import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Public';
  cakeToCreate = {
    name: '',
    url: ''
  };
  ratings = {
    rate: 0,
    comment: ''
  }
  cakes = [];
  reviews = [];
  clicked = false;
  avg = 0;
  constructor(private _httpService: HttpService){

  }
  ngOnInit(){
    this.getCakes();
  }

  getCakes(){
    let observable = this._httpService.getCakes();
    observable.subscribe(data => {
      console.log("Got our cakesss", data);
      console.log(data['data'])
      this.cakes = data['data'];
    })
  }


  createCake(cake){
    let observable = this._httpService.createCake(cake);
    observable.subscribe(data => {
      console.log(data)
    })
  }

  onSubmit() {
    console.log("in onsubmit")
    console.log(this.cakeToCreate);
    this.createCake(this.cakeToCreate);
    this.cakeToCreate.name = "";
    this.cakeToCreate.url = "";
  }

  createRate(id:any, ratings){
    let observable = this._httpService.createRate(id, ratings);
    observable.subscribe(data => {
      console.log(data, "ratingg");
  })
  }

  onRate(id:any, rate){
    console.log("in onsubmit")
    console.log(this.ratings);
    this.createRate(id, this.ratings);
    this.ratings.rate = 0;
    this.ratings.comment = "";
  }

  getAverage(id:any){
    let observable = this._httpService.getAverage(id);
    observable.subscribe(data => {
      console.log("calculating average", data);
      console.log();
      this.avg = data['data'][0]["rateavg"];
      console.log(this.avg);
    })
  }

  getReviews(id:any){
    this.clicked = true;
    console.log("getting reviews");
    let observable = this._httpService.getReviews(id);
    observable.subscribe(data => {
      console.log("Got the reviews", data);
      console.log(data['data']);
      this.reviews = data['data'];
    })
  }


}

