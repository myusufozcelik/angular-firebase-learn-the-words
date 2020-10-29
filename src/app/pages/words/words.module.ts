import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordsPageRoutingModule } from './words-routing.module';

import { WordsPage } from './words.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [WordsPage]
})
export class WordsPageModule {}
