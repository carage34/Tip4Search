import {Video} from "./video.model";

export class Message {
  id: string;
  video: Video;
  winner: String[];
  postedAt: Date;
  done: boolean;
  song: String;
}
