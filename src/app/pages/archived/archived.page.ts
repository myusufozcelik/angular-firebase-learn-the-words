import { map } from 'rxjs/operators';
import { WordsFireService } from 'src/app/services/words-fire.service';
import { Words } from 'src/app/modules/words';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.page.html',
  styleUrls: ['./archived.page.scss'],
})
export class ArchivedPage implements OnInit {

  words: Words[];

  constructor(private wordsFire: WordsFireService) { }

  ngOnInit() {
    this.getStatusIsOne();
  }

  getStatusIsOne() {
      this.wordsFire.getStatus(1).snapshotChanges().pipe(map(data => data.map(f => ({key: f.payload.key, ...f.payload.val()}))))
      .subscribe(data => {
        this.words = data;
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

}
