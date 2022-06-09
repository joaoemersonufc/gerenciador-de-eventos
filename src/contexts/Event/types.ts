

export type IEvent = {
	description: string,
	eventType: string,
	sessions: ISession[],
};

export type ISession = {
	date: string,
	placeId: number,
	fullTicketValue: number;
}
