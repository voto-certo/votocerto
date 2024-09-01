import { TestBed } from '@angular/core/testing';

import { TseService } from './tse.service';

describe('TseService', () => {
  let service: TseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
