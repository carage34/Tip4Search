import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Video} from "../home/models/video.model";
import {Message} from "../home/models/message.model";
import {SongService} from "../services/song.service";
import {Song} from "../home/models/song.model";
import {FormControl, FormGroup} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public selected : any = null;
  public songs: Song[];
  public artist: string[] = [];
  public titre : Song[] = [];
  filteredOptions: Observable<string[]>;
  filteredTitre: Observable<string[]>;
  songControl = new FormControl('');
  titreControl = new FormControl('');

  ngOnInit() {
    this.filteredOptions = this.songControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.songControl.valueChanges.subscribe((value) => {
      this.artistChanged(value);
    })
    this.titreControl.valueChanges.subscribe((value) => {
      console.log(value);
    })
  }

  artistChanged(value: string | null) {
    this.titre = this.songs.filter(song => song.artist.toLowerCase() === value?.toLowerCase());
    console.log(this.titre);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.artist.filter(artist => artist.toLowerCase().includes(filterValue));
  }

  editMessage() {
    let songId = this.songs.filter(song => song.name === this.titreControl.value)[0]._id;
    this.messageService.affectSong(this.selected._id, songId).subscribe((res) => {
      this.data.messageDialog = this.data.messageDialog.filter(message => message._id != this.selected._id);
      this.songControl.patchValue('');
      this.titreControl.patchValue('');
      if(this.data.messageDialog.length > 0) {
        this.selected = this.data.messageDialog[0];
      } else {
        this.dialogRef.close();
      }

    });
  }


    constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public songService: SongService,
    public messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: {messageDialog: Message[]},
  ) {
    console.log(data.messageDialog);
    this.selected = data.messageDialog[0];
    this.songService.getSongs().subscribe((songs: Song[]) => {
      this.songs = songs;
      this.songs.forEach((song: Song) => {
        if(!(this.artist.includes(song.artist))) {
          this.artist.push(song.artist);
        }
      });
    });
  }
}
