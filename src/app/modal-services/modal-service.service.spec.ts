/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalServiceService } from './modal-service.service';

describe('Service: ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalServiceService]
    });
  });

  it('should ...', inject([ModalServiceService], (service: ModalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
