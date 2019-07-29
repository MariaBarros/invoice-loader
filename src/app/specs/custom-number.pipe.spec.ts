import { CustomNumberPipe } from '../core/custom-number.pipe';

describe('CustomNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomNumberPipe();
    expect(pipe).toBeTruthy();

    expect(pipe.transform('1',6)).toBe('0000001');
  });
});
