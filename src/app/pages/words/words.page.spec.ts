import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WordsPage } from './words.page';

describe('WordsPage', () => {
  let component: WordsPage;
  let fixture: ComponentFixture<WordsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
