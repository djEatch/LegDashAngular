import { TestBed, inject } from '@angular/core/testing';

import { GetSubLBListService } from './get-sub-lblist.service';

describe('GetSubLBListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSubLBListService]
    });
  });

  it('should be created', inject([GetSubLBListService], (service: GetSubLBListService) => {
    expect(service).toBeTruthy();
  }));
});
