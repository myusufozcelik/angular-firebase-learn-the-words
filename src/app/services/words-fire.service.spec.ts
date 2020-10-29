import { TestBed } from '@angular/core/testing';

import { WordsFireService } from './words-fire.service';

describe('WordsFireService', () => {
  let service: WordsFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
