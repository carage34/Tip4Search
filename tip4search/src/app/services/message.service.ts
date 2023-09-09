import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../home/models/video.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  //public API_URL = "http://localhost:4000/api";
  public API_URL = "https://sam.absolumentpc77-informatique.fr/api"
  constructor(private http: HttpClient) { }

  public getMessageToProcess() : Observable<Video[]> {
    return this.http.get<Video[]>(`${this.API_URL}/videos`);
  }

  public affectSong(messageId: string, songId: string) : Observable<any> {
    return this.http.post(`${this.API_URL}/messages/${messageId}`, {songId: songId});
  }
}
