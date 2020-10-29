import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Words } from 'src/app/modules/words';
import { WordsFireService } from 'src/app/services/words-fire.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  words: Words[];
  favoritesCount: number;
  isClick = false;
  constructor(private wordsFire: WordsFireService) { }
  @Input() favoriteCount: number;
  ngOnInit() {
    this.getFavorite();
  }

  getFavorite(): void {
    this.wordsFire.getFavorite().snapshotChanges().pipe(map(data =>
      data.map(f => ({ key: f.payload.key, ...f.payload.val() })))
    ).subscribe(data => {
      this.words = data;
      this.favoriteCount = this.words.length;
    });
  }

  setFavoriteWithFire(getWord: Words, type: string) {
    console.log(type);
    console.log(getWord);
    if (type === 'favorite') {
      const favoriteValue = (getWord.favorite === 1) ? 0 : 1;
      console.log(`favoriteValue = ${favoriteValue}`);
      this.wordsFire.update(getWord.key, {favorite: favoriteValue})
      .then(() => {
        console.log('The update process is successfull!');
      })
      .catch(err => console.log(err));
    }
    }

}
