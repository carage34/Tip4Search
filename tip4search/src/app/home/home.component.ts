import { Component } from '@angular/core';
import {HomeService} from "./home.service";
import {Video} from "./models/video.model";
import {registerLocaleData} from "@angular/common";
import {VideoService} from "../services/video.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public videos: Video[];
  constructor(private videoService: VideoService) {
    videoService.getVideos().subscribe((videos: Video[]) => {
      this.videos = videos;
      this.videos.forEach((video) => videoService.replaceUrl(video));
    });
  }
}
