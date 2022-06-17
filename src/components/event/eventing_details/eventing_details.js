import moment from "moment";
import 'moment/locale/pt-br';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const ScreeningDetails = (props) => {
    const now = moment(new Date(props.event?.dt_cadastro));

    return (
        <Container>
            <h4>Detalhes do evento</h4>
            <Content>
                {props.event?.sessoes?.map(session => 
                    <Link to={'/booking/'+props.event?.id_evento+'?'+session?.id_sessao} style={{"text-decoration": "none"}}>
                        <Wrap>
                            <span>{session?.dt_sessao?.split('T')[1].substring(0,5)} {now.format('DD MMM')}</span>
                        </Wrap>
                    </Link>
                )}
            </Content>
        </Container>
    )
}

export default ScreeningDetails

const Container = styled.div`
    margin-top: 10px;
    padding: 30px 0px 26px;
    @media (max-width: 900px) {
        margin-bottom: 30px;
    }

    h4{
        margin-bottom: 15px;
    }
`

const Content = styled.div`
    display: flex;
    grid-gap: 25px;
    overflow-X: auto;
    padding-left: 5px;
    @media (max-width: 900px) {
        font-size: 12px;
    }

    ::-webkit-scrollbar {
        display: none;
    }
`

const Wrap = styled.div`
    border-radius: 10px;
    cursor: pointer;
    background-color: #090b13;
    border: 3px solid rgba(249, 249, 249, 0.1);
    rgba(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    text-align: center;
    padding: 20px 20px 20px;
    @media (max-width: 900px) {
        width: 150px;
    }
    
    &:hover {
        transform: scale(1.05);
        border-color: rgba(249, 249, 249, 0.8);
    }

    span {
        letter-spacing: 1.42px;
        color: rgb(249, 249, 249, 0.8);
    }
`