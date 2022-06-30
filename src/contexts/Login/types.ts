

export type ISignUp = {
  name: string,
	cpf: string,
	sexo: string,
	email: string,
	telephone: string,
	login: string,
	password: string,
	birthDate: string
};

export type ISignIn = {
	token?: string,
	email: string,
	ds_nome: string,
	password: string,
};
