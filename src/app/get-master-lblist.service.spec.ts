import { TestBed, inject } from '@angular/core/testing';

import { GetMasterLBListService } from './get-master-lblist.service';

describe('GetMasterLBListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetMasterLBListService]
    });
  });

  it('should be created', inject([GetMasterLBListService], (service: GetMasterLBListService) => {
    expect(service).toBeTruthy();
  }));
});
