import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    // We just instantiate the class like any other TS object.
    // No "TestingModule" needed. Sub-millisecond execution!
    // Since it is domain service, it doesn't have any dependencies
    service = new AuthService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
