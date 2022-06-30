import styled from 'styled-components';

interface DataProps {
    dataList: string[];
}

function Ticket({ dataList }: DataProps) {

    // const handleGenerate = useCallback(() => {
    //     const data = {
    //         "id_venda": "2",
    //         "nr_protocolo": 165644,
    //         "nr_valorvenda": 52.5,
    //         "dt_venda": "2022-06-28T18:41:52.089Z",
    //         "id_usuario": null,
    //         "ds_formapagamento": "A Vista",
    //         "ds_tipovenda": "Guichê",
    //         "ds_nomecliente": "Luis Otávio Lima Caminha",
    //         "ds_tipodocumento": "CPF",
    //         "nr_documento": "082.738.693-18",
    //         "amountRate": 2.5,
    //         "tickets": [
    //             {
    //             "id_ingresso": 3,
    //             "ds_assento": "4A",
    //             "ds_tipo": "Meia",
    //             "nr_valor": 50,
    //             "id_sessao": 1,
    //             "id_venda": 2
    //             }
    //         ]
    //     };

    //     generateTicketDocument(data);
    // }, []);

    return (
        <Container>
            <TicketSection>
                <TicketMessage>
                    <h1>
                        <img src="https://i.pinimg.com/originals/9d/79/f1/9d79f11547a0edd240cf6178e9a5a871.gif" alt="celebration" />
                        <span>&nbsp;&nbsp;\( ﾟヮﾟ)/</span>
                    </h1>
                    <h3>
                        Seu ingresso foi reservado com sucesso, imprima-o e leve-o ao evento, bom proveito.
                        Nos vemos em breve. :)
                    </h3>
                </TicketMessage>
            </TicketSection>
        </Container>
    )
}

export default Ticket

const Container = styled.main`
    min-height: calc(100vh - 140px);
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow-x: hidden;
    background: url(https://c.tenor.com/_KKq4rR2xjwAAAAd/curti%C3%A7%C3%A3o-enjoyment.gif) no-repeat;
    background-size: cover;

    h1, h3{
        color: #fff;
    }

`
const TicketSection = styled.div`
    background: #0c111b;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 30px;
`

const TicketMessage = styled.div`
    h1 {
        position: relative;
        img {
            vertical-align: middle;
            height: 60px;
        }
    }
`

const DownloadTicket = styled.div`
    margin: 20px 0px;
`

const Download = styled.button`
    border-radius: 4px;
    font-size: 15px;
    padding: 10px 20px; 
    display: flex;
    align-items: center;
    background: rgb(249, 249, 249);
    border: none;
    letter-spacing: 1.8px;
    cursor: pointer;

    img {
        height: 40px;
    }
`