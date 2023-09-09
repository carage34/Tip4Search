import { Component } from '@angular/core';
import {Video} from "../home/models/video.model";
import {VideoService} from "../services/video.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {Message} from "../home/models/message.model";

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent {
  public videos: Video[];
  public messageUndone: Message[];
  constructor(private videoService: VideoService, public dialog: MatDialog) {
    videoService.getVideos().subscribe((videos: Video[]) => {
      this.videos = videos;
      this.videos.forEach((video) => videoService.replaceUrl(video));
      this.videos.forEach(video => {
        video.messages = video.messages.filter(message=> !message.done);
      })
      console.log(this.videos);
    });
  }

  openDialog(messageDialog: Message[], video: Video): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {messageDialog: messageDialog, video: video},
      minWidth: "500",
      maxHeight: "500"
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
