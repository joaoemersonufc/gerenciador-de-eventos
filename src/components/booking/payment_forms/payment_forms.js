import { useFormik } from 'formik';
import styled from 'styled-components';

function PaymentForms() {

    const { values, handleChange } = useFormik({
        initialValues: {
            paymentForms: 'cartao',
            typeTicket: 'inteira',
            parcelas: '1',
        },
    });

    localStorage.setItem('@paymentForms', values.paymentForms);
    localStorage.setItem('@typeTicket', values.typeTicket);

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
        
        <Container>
            <h4>Selecione o tipo de entrada</h4>
            <Content>
                <select name="type" onChange={handleChange} value={values.typeTicket}>
                    <option value="inteira">
                        Inteira
                    </option>
                    <option value="meia">
                        Meia
                    </option>
                </select>
            </Content>
        </Container>
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

    select{
        background: #0c111b;
        color: #fff;
        height: 70px;
        width: 150px;
        border-radius: 5px;
        font-size: 16px;
    }
`