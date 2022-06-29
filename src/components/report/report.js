import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useReports } from '../../contexts/Reports/Context';

function setZoom() {
    if (navigator.appVersion.indexOf("Win") !== -1)
    {
        document.body.style.zoom = "90%";
    }
}

const Report = () => {
  const [button, setButton] = useState('');
    setZoom();

    const { reports, getReports } = useReports();

    useEffect(() => {
      getReports({type: 'availableSessions'})
    }, []);

    function setReportsType(type) {
      switch (type){
        case 'date':
          if(button === 'date'){
            getReports({type: 'availableSessions'})
            setButton('');
            return;
          }
          getReports('date');
          setButton('date');
          break;
        case 'session':
          if(button === 'session'){
            getReports({type: 'availableSessions'})
            setButton('');
            return;
          }
          getReports('session')
          setButton('session');
          break;
        case 'avaliable':
          if(button === 'avaliable'){
            getReports({type: 'availableSessions'})
            setButton('');
            return;
          }
          getReports('avaliable')
          setButton('avaliable');
          break;
        default:
          break;
      }
    }

    return (
        <Container>
        <Header>
          <button onClick={() => setReportsType('date')} className={button === 'date' && "clicked"}>
            <h6>
              Faturamento por data
            </h6>
          </button>
          <button onClick={() => setReportsType('session')} className={button === 'session' && "clicked"}>
            <h6>
              Faturamento por sessão
            </h6>
          </button>
          <button onClick={() => setReportsType('avaliable')} className={button === 'avaliable' && "clicked"}>
            <h6>
              Sessões disponíveis
            </h6>
          </button>
          </Header>
          <ReportList>
              {reports.map(report => <div>{report.ds_tipoevento}</div>)}
          </ReportList>
        </Container>
    )
}

export default Report

const Container = styled.div`
    min-height: calc(100vh - 160px);
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    background: #090b13;
    flex-flow: column;
`

const Header = styled.div`
    min-height: calc(35vh - 160px);
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    flex-flow: row;
    justify-content: center;

    button{
      max-width: 300px;
      max-height: 50px;
      border-radius: 10px;
      margin: 15px;
       
      :hover{
        border: 1px solid #fff;
        color: #fff;
        background-color: #090b13;
      }

      &.clicked{
        border: 1px solid #fff;
        color: #fff;
        background-color: #090b13;
      }
    }
`
const ReportList = styled.div`
min-height: calc(100vh - 160px);
    padding: 20px;
    border-radius: 5px;
    background: #fff;
`