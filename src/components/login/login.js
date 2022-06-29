import 'font-awesome/css/font-awesome.min.css';
import { useFormik } from 'formik';
import { useState } from 'react';
import styled from 'styled-components';
import { useLogin } from '../../contexts/Login/Context';
import { validationSchema } from './singUpEvent';

function Login() {
    const [mode, toggleMode] = useState(true);
    
    return (
        <Container>
            <Content>
                <header>
                    <h1>{mode ? 'Bem-vindo de volta!' : 'Se junte a nós!'}</h1>
                    <Switch>
                        <span>{mode ? 'Não' : 'Já'} possui uma conta?</span>
                        <input type="checkbox" id="checkbox1" onClick={() => toggleMode(!mode)} />
                        <label for="checkbox1"></label>
                    </Switch>
                </header>
                <LoginForm mode={mode} />
            </Content>
        </Container>
    )      
}

export default Login

function LoginForm({mode}) {

    const initialValues = {
        name: '',
        cpf: '',
        sexo: '',
        telephone: '',
        email: '',
        password: '',
        repeatPassword: '',
        birthDate: ''
    }

    const { getSignIn, getSignUp } = useLogin();

    const { handleSubmit, values, handleChange, dirty, isValid } = useFormik({
        validationSchema: !mode && validationSchema, 
        initialValues,
        onSubmit: mode ? getSignIn : getSignUp,
    });

    const cpf = (v) => {
        v=v.replace(/\D/g,"")                   
        v=v.replace(/(\d{3})(\d)/,"$1.$2")      
        v=v.replace(/(\d{3})(\d)/,"$1.$2")       
        v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") 
        return v
    }

    const dateInputMask = (elm) => {
          var len = elm?.length;
          if(len === 2) {
            return elm += '/';
          }
          if(len === 5) {
            return elm += '/';
          }
      };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <div>
                    <InputIcon style={{display: !mode ? "none": ""}}>
                        <i className="fa fa-user" />
                        <Input type="email" name="email" label="email" placeholder="Digite seu email" disabled={!mode} value={values.email} onChange={handleChange}/>
                    </InputIcon>
                    <InputIcon style={{display: !mode ? "none": ""}}>
                        <i className="fa fa-key" />
                        <Input type="password" name="password" label="password" placeholder="Digite sua senha" disabled={!mode} value={values.password} onChange={handleChange} />
                    </InputIcon>
                </div>
                <div>
                    <InputIcon style={{display: mode ? "none": ""}}>
                        <i className="fa fa-user" />
                        <Input type="text" name="name" label="full name" placeholder="Digite seu nome completo" disabled={mode} value={values.name} onChange={handleChange} />
                    </InputIcon>
                    <InputIcon style={{display: mode ? "none": ""}}>
                        <i className="fa fa-user" />
                        <Input type="email" name="email" label="email" placeholder="Digite seu email" disabled={mode} value={values.email} onChange={handleChange} />
                    </InputIcon>
                    <InputIcon style={{display: mode ? "none": ""}}>
                        <i className="fa fa-key" />
                        <Input type="password" name="password" label="password" placeholder="Digite sua senha" disabled={mode} value={values.password} onChange={handleChange} />
                    </InputIcon>
                    <InputIcon style={{display: mode ? "none": ""}}>
                        <i className="fa fa-key" />
                        <Input type="password" name="repeatPassword" label="repeat password" placeholder="Repita sua senha" disabled={mode} value={values.repeatPassword} onChange={handleChange} />
                    </InputIcon>
                    <InputIcon style={{display: mode ? "none": ""}}>
                        <i className="fa fa-user" />
                        <Input maxLength={14} type="text" name="cpf" label="cpf" placeholder="Digite seu CPF" disabled={mode} value={cpf(values.cpf)} onChange={handleChange} />
                    </InputIcon>
                    <InputIcon style={{display: mode ? "none": ""}}>
                        <i className="fa fa-user" />
                        <Input maxLength={11} type="text" name="telephone" label="telephone" placeholder="Digite seu Telefone" disabled={mode} value={values.telephone} onChange={handleChange} />
                    </InputIcon>
                    <InputIcon style={{display: mode ? "none": ""}}>
                        <i className="fa fa-user" />
                        <Input maxLength={10} type="text" name="birthDate" label="birthDateday" placeholder="Digite sua data de nascimento" disabled={mode} value={dateInputMask(values.birthDate)} onChange={handleChange} />
                    </InputIcon>
                    <InputIcon style={{display: mode ? "none": ""}}>
                        <i className="fa fa-user" />
                        <Input maxLength={1} type="sexo" name="sexo" label="sexo" placeholder="Sexo" disabled={mode} value={values.sexo} onChange={handleChange} />
                    </InputIcon>
                </div>
            </div>
                <Button onSubmit={handleSubmit} disabled={!isValid || !dirty}>{mode ? 'Entrar' : 'Cadastrar'}</Button>
        </Form>
    )

}

const Container = styled.div`
    position: relative;
    display:flex;
    align-items: center;
    justify-content: center;

    &:before {
        background-position: top;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url("/images/banner.jpg");
        position: absolute;
        content: "";
        top:0;
        bottom:0;
        left:0;
        right:0;
        z-index:-1;
    }
`

const Content = styled.div`
    max-width: 650px;
    padding: 50px 40px;
    margin: 50px;
    width: 80%;
    display: flex;
    flex-direction: column;
    background: rgba(0,0,0,0.8);
    border-radius: 10px;
    overflow: hidden;

    @media (max-width: 900px) {
        width: 90%;
    }
`

const InputIcon = styled.div`
    i {
        position:absolute;
        padding: 15px 10px;
        text-align: center;
        color: rgb(249,249,249,0.8);
    }
`

const Input = styled.input`
    width: 100%;
    color: white;
    margin-bottom: 15px;
    font-size: 16px;
    padding: 15px 0;
    padding-right: 15px;
    padding-left: 45px;
    background: #333;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: $borderRadius;
    &:focus {
        color: white;
        outline: white;
        border: 1px solid #fff;
    }
`

const Button = styled.button`
    width: 100%;
    color: #f9f9f9;
    background-color: #1f80e0;
    font-weight: bold;
    padding: 17px 0;
    border: none;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 250ms;
    // letter-spacing: 1.5px;
    margin-top: 8px;
    margin-bottom: 12px;

    &:hover {
        background: #0483ee;
    }

    &:disabled {
        background-color: #c4c4c4;
        pointer-events: none;
    }
`

const Switch = styled.div`
    position: relative;

    label {
        cursor: pointer;
        position: absolute;
        background-color: white;
        border-radius: 50px;
        width :55px;
        height: 23px;
        top: 0;
        right: 0;
    }

    label:after {
        content : '';
        width : 21px;
        height: 21px;
        border-radius: 50px;
        position: absolute;
        background-color: #1f80e0;
        transition: all 0.2s;
        top :1px;
        left: 1px;
    }	

    input[type="checkbox"] {
        visibility: hidden;
    }

    input[type="checkbox"]:checked + label {
        background-color: white;
    }

    input[type="checkbox"]:checked + label:after {
        left: 33px;
    }
`

const Form  = styled.form`
    margin-top: 30px;
`