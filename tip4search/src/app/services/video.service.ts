import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../home/models/video.model";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  //public API_URL = "http://localhost:4000/api";
  public API_URL = "https://sam.absolumentpc77-informatique.fr/api"
  constructor(private http: HttpClient) { }

  public getVideos() : Observable<Video[]> {
    return this.http.get<Video[]>(`${this.API_URL}/videos`);
  }

  public replaceUrl(video: Video) : Video {
    video.thumbnail = video.thumbnail.replace("%{width}", "350");
    video.thumbnail = video.thumbnail.replace("%{height}", "200");
    return video;
  }
}

