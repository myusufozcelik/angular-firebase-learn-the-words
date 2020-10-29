import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Words } from 'src/app/modules/words';
import { WordsFireService } from 'src/app/services/words-fire.service';
import { WordsService } from 'src/app/services/words.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-words',
  templateUrl: './words.page.html',
  styleUrls: ['./words.page.scss'],
})
export class WordsPage implements OnInit {

  words: Words[];
  wordFire: any;
  statusValue = 'word.status === 1 ? call : favorite';
  wordStatus: any;
  favorites: number;
  constructor(private wordsService: WordsService, private wordsFire: WordsFireService) { }

  ngOnInit() {
    // this.getWordsWithStatus();
    this.getWordsWithFire();
    this.getStatusWithFire();
  }

  getWordsWithStatus() {
    this.wordsService.getWords().subscribe(data => {
      this.words = data;
    });
  }

  getWordsWithFire(): void {
    this.wordsFire.getAll().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(data => {
      this.wordFire = data;
      console.log(this.wordFire);
    });
  }

  getStatusWithFire(): void {
    this.wordsFire.getStatus().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(data => {
      this.wordStatus = data;
      console.log(this.wordStatus);
    });
  }

  setStatusWithFire(getWord: Words, type: string): void {
    console.log(type);
    console.log(getWord);
    if (getWord.status === 0 && type === 'call') {
      this.wordsFire.update(getWord.key, { status: 1 })
        .then(() => {
          getWord.status = 1;
        })
        .catch(err => console.log(err));
      }
    if ((getWord.status === 1 || getWord.status === 0) && type === 'favorite') {
        this.wordsFire.update(getWord.key, { status: 0 })
        .then(() => {
          getWord.status = 0;
        })
        .catch(err => console.log(err));
    }
  }

  setFavoriteWithFire(getWord: Words, type: string) {

    if (type === 'favorite') {
      const favoriteValue = (getWord.favorite === 0) ? 1 : 0;
      this.wordsFire.update(getWord.key, {favorite: favoriteValue})
      .then(() => {
          getWord.favorite = favoriteValue;
          console.log('The update process is successfull!');
      })
      .catch(err => console.log(err));
      console.log(getWord);
    }
    }
}
