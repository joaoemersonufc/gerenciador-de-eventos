

export type IEvent = {
	description: string,
	eventType: string,
	sessions: ISession[],
};

export type IEventList = {
	id_evento: number,
	ds_evento: string,
	dt_cadastro: string,
	ds_tipoevento: string
};

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
