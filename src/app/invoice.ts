const ITEM_STORED_NAME : string = "invoice";

export class Invoice {

	id:number;

	net: number;

	tax: number;

	total: number;

	constructor(){

		this.setDefaultValues();

		this.getDataStored();

		this.setTotal();

	}

	updateValues(id, net, tax){

		this.id = id;

		this.net = net;

		this.tax = (typeof(tax) === "string") ? parseFloat(tax) : tax;

		this.setTotal();

	}

	setDefaultValues(){

		this.id = null;

		this.net = 0;

		this.tax = 0;

	}

	setTotal(){

		this.total = (this.net > 0 && this.tax > 0) ? this.net * (1 + this.tax) : 0;		

	}

	store(){

		const dataToStore = JSON.stringify(this);

    	localStorage.setItem(ITEM_STORED_NAME, dataToStore);

	}

	getDataStored(){

		const item = JSON.parse(localStorage.getItem(ITEM_STORED_NAME));

		if(item){

			this.updateValues(item.id, item.net, item.tax);			

		}
		
	}

	removeFromStorage(){

		localStorage.removeItem(ITEM_STORED_NAME);

		this.setDefaultValues();

		this.setTotal();

	}
}