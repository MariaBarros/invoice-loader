import { CustomDecimalPipe } from '../core/custom-decimal.pipe';

describe('CustomDecimalPipe', () => {

  function setup(){
  	const pipe = new CustomDecimalPipe();

  	return {pipe};
  }
  
  it('create an instance', () => {
    const { pipe } = setup();
    expect(pipe).toBeTruthy();        
  });

  it('should transform thousands and digital part', () => {
    const { pipe } = setup();    
    expect(pipe.transform('1,200.30')).toBe('1.200,30');    
  });

  it('should transform only digital part when the number < 1000', () => {
    const { pipe } = setup();    
    expect(pipe.transform('200.30')).toBe('200,30');    
  });
});
