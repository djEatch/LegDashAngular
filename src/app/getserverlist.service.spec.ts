import { TestBed, inject } from '@angular/core/testing';

import { GetserverlistService } from './getserverlist.service';

describe('GetserverlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetserverlistService]
    });
  });

  it('should be created', inject([GetserverlistService], (service: GetserverlistService) => {
    expect(service).toBeTruthy();
  }));
});
