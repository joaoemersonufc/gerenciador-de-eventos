import { useFormik } from 'formik';
import styled from 'styled-components';

function PaymentForms() {

    const { values, handleChange } = useFormik({
        initialValues: {
            paymentForms: 'cartao',
            typeTicket: 'Inteira',
            typeDocument: 'CPF',
            numberDocument: '000.000.000-00',
            parcelas: '1',
        },
    });

    localStorage.setItem('@paymentForms', values.paymentForms);
    localStorage.setItem('@typeTicket', values.typeTicket);
    localStorage.setItem('@typeDocument', values.typeDocument);

    const cpf = (v) => {
        v=v.replace(/\D/g,"")                   
        v=v.replace(/(\d{3})(\d)/,"$1.$2")      
        v=v.replace(/(\d{3})(\d)/,"$1.$2")       
        v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") 
        return v
    }
    
    localStorage.setItem('@numberDocument', cpf(values.numberDocument));

    return (
        <>
        <Container>
            <h4>Selecione uma forma de pagamento</h4>
            <Content>
                <select name="paymentForms" onChange={handleChange} value={values.paymentForms}>
                    <option value="cartao">
                        Cartão de crédito
                    </option>
                    <option value="dinheiro">
                        Dinheiro
                    </option>
                    <option value="pix">
                        Pix
                    </option>
                </select>
                {values.paymentForms === 'cartao' ? 
                <select name="parcelas" onChange={handleChange} value={values.parcelas}>
                    <option value="1">
                    x1
                    </option>
                    <option value="2">
                    x2
                    </option>
                    <option value="3">
                    x3
                    </option>
                    <option value="4">
                    x4
                    </option>
                    <option value="5">
                    x5
                    </option>
                    <option value="6">
                    x6
                    </option>
                    <option value="7">
                    x7
                    </option>
                    <option value="8">
                    x8
                    </option>
                    <option value="9">
                    x9
                    </option>
                    <option value="10">
                    x10
                    </option>
                    <option value="11">
                    x11
                    </option>
                    <option value="12">
                    x12
                    </option>
                </select> : <></>}
            </Content>
        </Container>
        
        <Row>
            <Container>
                <h4>Tipo de entrada</h4>
                <Content>
                    <select name="typeTicket" onChange={handleChange} value={values.typeTicket}>
                        <option value="Inteira">
                            Inteira
                        </option>
                        <option value="Meia">
                            Meia
                        </option>
                    </select>
                </Content>
            </Container>
            <Container>
                <h4>Selecione o tipo de documento</h4>
                <Row>
                    <Content>
                        <select name="typeDocument" onChange={handleChange} value={values.typeDocument}>
                            <option value="CPF">
                                CPF
                            </option>
                        </select>
                    </Content>
                    <Content>
                        <input maxLength={14} name="numberDocument" onChange={handleChange} value={cpf(values.numberDocument)}/>
                    </Content>
                </Row>
            </Container>
        </Row>
        </>
    )
}

export default PaymentForms

const Container = styled.div`
    padding: 30px 0px 26px;
    @media (max-width: 900px) {
        margin-bottom: 30px;
    }
`

const Row = styled.div`
    display: flex;
    flex-flow: row;
    gap: 50px;
    width: 100%;
`

const Content = styled.div`
    display: flex;
    grid-gap: 25px;
    overflow-X:auto;
    padding: 10px 5px;
    @media (max-width: 900px) {
        font-size: 12px;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    select, input{
        background: #0c111b;
        color: #fff;
        height: 70px;
        width: 150px;
        border-radius: 5px;
        font-size: 16px;
    }
`