import { TestBed } from '@angular/core/testing';

import { FgService } from './fg.service';

describe('FgService', () => {
  let service: FgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
