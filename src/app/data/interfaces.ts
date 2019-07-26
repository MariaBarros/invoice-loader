export interface IInvoice {
	id: number,
	net: number,
	tax: number,
	total: number
}

export interface IPosition{
	lat: number,
	lng: number
}

export interface ITemperature{
	code:string,
	value:string
}