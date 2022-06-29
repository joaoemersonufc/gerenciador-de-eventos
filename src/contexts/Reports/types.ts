

export type IReport = {
		type: string,
		filter:  string,
		value: string,
		finalDate: string,
};

export type IValue = {
	id_evento: number,
	id_sessao: number,
	ds_evento: string,
	ds_tipoevento: string,
	ds_local: string,
	ds_data: string,
	ds_hora: string,
	ingressos_disponiveis: number,
}