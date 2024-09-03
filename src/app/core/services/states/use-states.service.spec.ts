import { TestBed } from '@angular/core/testing';

import { UseStatesService } from './use-states.service';

describe('UseStatesService', () => {
  let service: UseStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
