import {Message} from "./message.model";

export class Video {
  id: string;
  name: string;
  thumbnail: string;
  postedAt: Date;
  messages: Message[];
  twitchid: string;
  available: boolean;
  youtubeid: string;
}
