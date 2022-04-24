import { TestBed } from '@angular/core/testing';

import { MovieHelperService } from './movie-helper.service';

describe('MovieHelperService', () => {
  let service: MovieHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
