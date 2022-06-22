

export type IEvent = {
	description: string,
	name: string,
	eventType: string,
	sessions: ISession[],
};

export type IEventList = {
	id_evento: number,
	ds_evento: string,
	dt_cadastro: string,
	ds_tipoevento: string
};

export type ISales = {
	id_usuario : null,
	id_sessao : number,
	nr_protocolo : number,
	ds_formapagamento : string,
	ds_tipovenda : string,
	ds_nomecliente : string,	
	ds_tipodocumento : string,
	nr_documento : string,
	tickets : ITicket[]
};

export type ITicket = {
		ds_assento: string,
		ds_tipo: string
}

export type ISeats = {
	id_sessao: number,
	seats: number,
	availableSeats: number,
	sailedSeats: number,
	seatsAvailability: ISeat[]
}

export type ISeat = {
	seat: number,
	seatKey: string,
	available: boolean
}

export type ISession = {
	date: string,
	placeId: number,
	fullTicketValue: number;
}
