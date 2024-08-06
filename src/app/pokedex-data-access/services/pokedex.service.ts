import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { PokedexList } from '../models/pokedex';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})

export class PokedexService {

  private pokedexUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getPokedex(offset: number = 0, limit: number): Observable<PokedexList> {
    return this.http.get<PokedexList>(this.pokedexUrl + 'pokemon', {
      params: {
        offset: offset.toString(),
        limit: limit.toString()
      }
    });
  }

  getPokemon(id?: number | string): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.pokedexUrl+`pokemon/${id}`).pipe(catchError(error => {
      console.error('Error caught:', error);
      throw new Error('Error handled using catchError');
  }))

  }
}
