import moment from 'moment';
import styled from 'styled-components';

function screening_details() {
    const now = moment();

    return (
        <Container>
            <h4>Selecione um assento</h4>
            <Content>
                <Screening>
                <Wrap>
                        <span>10:00 {now.add(1,'days').format('DD MMM')}</span>
                    </Wrap>
                </Screening>
                <Screening>
                    <Wrap>
                        <span>08:00 {now.add(1,'days').format('DD MMM')}</span>
                    </Wrap>
                </Screening>
                <Screening>
                    <Wrap>
                        <span>10:00 {now.add(2,'days').format('DD MMM')}</span>
                    </Wrap>
                </Screening>
                <Screening>
                    <Wrap>
                        <span>08:00 {now.add(2,'days').format('DD MMM')}</span>
                    </Wrap>
                </Screening>
            </Content>
        </Container>
    )
}

export default screening_details

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
`
const Screening = styled.div`` 

const Wrap = styled.div`
    border-radius: 10px;
    cursor: pointer;
    border: 3px solid rgba(249, 249, 249, 0.1);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    text-align: center;
    padding: 20px 10px 20px;
    @media (max-width: 900px) {
        width: 150px;
    }
    
    &:hover {
        transform: scale(1.05);
        box-shadow: rgba(0 0 0 / 80%) 0px 40px 58px -16px,
        rgba(0 0 0 / 72%) 0px 30px 22px -10px;
        border-color: rgba(249, 249, 249, 0.8);
    }

    span {
        font-size: 15px;
        letter-spacing: 1.42px;
        color: rgb(249, 249, 249, 0.8);
    }
`