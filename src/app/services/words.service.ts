import { HttpClient, HttpClientModule, HttpParams, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { Words } from '../modules/words';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  url = environment.url;

  constructor(private httpService: HttpClient) { }

  getWords(): Observable<Words[]> { // status 0
   return this.httpService.get<Words[]>(`${this.url}/20`);
  }

  getStatus(): Observable<Words[]> {
    return this.httpService.get<Words[]>(`${this.url}/status`);
  }

  getFavorites(): Observable<Words[]> {
    return this.httpService.get<Words[]>(`${this.url}/favorites`);
  }

  setStatus(statusId: number, statusValue) {
    const params = new HttpParams().set('status', statusValue);
    // console.log(params.get('status')) // incoming value: 1  this is correct
    // console.log(`${this.url}/status/${statusId}`,params) // http://localhost:3000/words/status/1
    return this.httpService.put(`${this.url}/status/${statusId}`, params); // still status 0
  }

  setFavorites(favoritesId: number, favoriteValue) {
    const params = new HttpParams().set('favorite', favoriteValue);
    console.log(params.get('status'));
    console.log(`${this.url}/favorites/${favoritesId}`, params);
    return this.httpService.put(`${this.url}/favorites/${favoritesId}`, params);
  }
}
