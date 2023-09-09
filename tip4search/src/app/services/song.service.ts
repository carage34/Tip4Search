import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../home/models/video.model";
import {Song} from "../home/models/song.model";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  //public API_URL = "http://localhost:4000/api";
  public API_URL = "https://sam.absolumentpc77-informatique.fr/api"
  constructor(private http: HttpClient) { }

  public getSongs() : Observable<Song[]> {
    return this.http.get<Song[]>(`${this.API_URL}/songs`);
  }
}
