import { CustomNumberPipe } from '../core/custom-number.pipe';

describe('CustomNumberPipe', () => {
  function setup(){
  	const pipe = new CustomNumberPipe();

  	return {pipe};
  }

  it('create an instance', () => {
    const { pipe } = setup();
    expect(pipe).toBeTruthy();    
  });

  it('complete with 5 zeros when the number is less than 10', () => {
    const { pipe } = setup();    

    expect(pipe.transform('1',6)).toBe('000001');
  });

  it('no complete with zeros when the number is grather than 100000', () => {
    const { pipe } = setup();    

    expect(pipe.transform('100000',6)).toBe('100000');
  });
});
