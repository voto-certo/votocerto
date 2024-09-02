import { TestBed } from '@angular/core/testing';

import { StatesControlService } from './states-control.service';

describe('StatesControlService', () => {
  let service: StatesControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatesControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
