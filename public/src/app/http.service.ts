import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){

  }

  getCakes(){
    return this._http.get('/cakes')
  }

  createCake(cake){
    return this._http.post('/create', cake)
  }
  createRate(id: any, rate){
    return this._http.put(`/create/review/${id}`,rate)
  }

  getReviews(id:any){
    return this._http.get(`/cake/${id}`)
  }

  getAverage(id:any){
    return this._http.get(`/rate/${id}`);
  }

}
