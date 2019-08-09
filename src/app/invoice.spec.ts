import { Invoice } from './invoice';

describe('Invoice', () => {

  function setup() {  
  
    let invoiceInstance = new Invoice();

    return { invoiceInstance};

  }


  it('should create an instance', () => {

  	const { invoiceInstance } = setup();

    expect(invoiceInstance).toBeTruthy();

  });


  it('should storage the invoice in localStorage',() => {

  	let { invoiceInstance } = setup();

  	invoiceInstance.updateValues(100, 2000, 0.21);
  	
  	invoiceInstance.store();

  	const itemStored = localStorage.getItem('invoice');

  	expect(itemStored).not.toBe(null);

  });


  it('should get the invoice stored for patch values in the form',()=>{

  	const { invoiceInstance } = setup();

  	invoiceInstance.getDataStored();

	const equalValues = invoiceInstance.id === 100 && 
		invoiceInstance.net === 2000 &&
		invoiceInstance.tax === 0.21 && invoiceInstance.total > 0;

  	expect(equalValues).toBe(true);

  });


  it('should delete the invoice stored in localStorage',()=>{

  	const { invoiceInstance } = setup();

  	invoiceInstance.removeFromStorage();

  	const itemStorage = localStorage.getItem('invoice');

  	expect(itemStorage).toBe(null);
  });

});