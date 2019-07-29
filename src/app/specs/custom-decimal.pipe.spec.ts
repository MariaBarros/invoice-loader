import { CustomDecimalPipe } from '../core/custom-decimal.pipe';

describe('CustomDecimalPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDecimalPipe();
    expect(pipe).toBeTruthy();

    expect(pipe.transform('1,200.30')).toBe('1.200,30');
    expect(pipe.transform('200.30')).toBe('200,30');    
  });
});
