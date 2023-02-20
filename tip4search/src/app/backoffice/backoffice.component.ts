import { Component } from '@angular/core';
import {Video} from "../home/models/video.model";
import {VideoService} from "../services/video.service";

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent {
  public videos: Video[];
  constructor(private videoService: VideoService) {
    videoService.getVideos().subscribe((videos: Video[]) => {
      this.videos = videos;
      this.videos.forEach((video) => videoService.replaceUrl(video));
    });
  }
}
