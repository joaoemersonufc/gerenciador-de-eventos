import moment from "moment";
import 'moment/locale/pt-br';
import { useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillPrinter } from 'react-icons/ai';
import DatePicker from 'rsuite/DatePicker';
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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
          getReports({type: 'invoices'});
          setButton('date');
          break;
        case 'session':
          if(button === 'session'){
            getReports({type: 'availableSessions'})
            setButton('');
            return;
          }
          getReports({type: 'availableSessions'})
          setButton('session');
          break;
        case 'avaliable':
          if(button === 'avaliable'){
            getReports({type: 'availableSessions'})
            setButton('');
            return;
          }
          getReports({type: 'availableSessions'})
          setButton('avaliable');
          break;
        default:
          break;
      }
    }

    function printDIV(i){
      var conteudo = document.getElementById(i).innerHTML,
      tela_impressao = window.open('about:blank');
    
      tela_impressao.document.write(conteudo);
      tela_impressao.window.print();
      tela_impressao.window.close();
    }

    const handleSearch = ( value ) => {
      getReports({type: 'availableSessions', filter: 'id_event' || 'id_session', value})
    }

    const stringToDateTime = ( value ) => {
      const date = `${new Date(value).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
          }).split('/')[2]}-${new Date(value).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).split('/')[1]}-${new Date(value).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
      }).split('/')[0]}`.substring(0,10);

      return date;
    }

    useEffect(() => {
      if(startDate && endDate){
        getReports({type: 'availableSessions', filter: 'date', value: stringToDateTime(startDate), finalDate: stringToDateTime(endDate)})
      }
    }, [startDate, endDate])

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
            {button === 'date' ? 
              <>
                <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                style={{marginRight: 10, marginLeft: 20}}
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </>
              :
              <input style={{paddingTop: 7, paddingBottom: 7, marginLeft: 20, borderRadius: 5}} onChange={(e) => handleSearch(e.target.value)} placeholder="Pesquise atraves de um periodo, sessao ou nome do evento"/>
            } 
          </Header>
          <ReportList>
              {reports.length ? 
                  reports.map(report => {
                    const now = moment(new Date(report.ds_data));
                    return (
                    <ReportItem id="printable">
                      <Column>
                        <h3>Nome do evento: {report.ds_evento}</h3>
                        <h3>Data: {report.ds_data?.split('T')[1].substring(0,5)} {now.format('DD MMM')}</h3>
                        <h3>Local: {report.ds_local}</h3>
                      </Column>
                      <Column>
                        <h3>Tipo de evento: {report.ds_tipoevento}</h3>
                        <h3>{report.total_ingressos_vendidos ? 'Quantidade de ingressos vendidos: ' : 'Quantidade de ingressos disponiveis: '}{report.total_ingressos_vendidos || report.ingressos_disponiveis}</h3>
                      </Column>
                      <Column>
                        <AiFillPrinter onClick={() => printDIV('printable')}/>
                      </Column>
                    </ReportItem>
                  )})
                  :
                  <ReportItem id="printable" style={{color: '#fff'}}>
                    Nenhum relatório disponivel
                  </ReportItem>
              }
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

    button {
      padding: 10px;
    }
`

const ReportItem = styled.div`
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    background: #090b13;
    flex-flow: row;
    height: 100px;
    width: 100%;
    border: 1px solid #000;
    border-radius: 5px;
    margin-bottom: 20px;
    justify-content: space-between;
    align-items: center;

    h3{
      font-size: 14px;
      color: #fff;
      line-height: inherit;
    }

    svg{
      fill: #fff;
      font-size: 25px;
      cursor: pointer;
    }
`

const Column = styled.div`
    display: flex;
    flex-flow: column;
`

const Header = styled.div`
    min-height: calc(35vh - 160px);
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;

    button{
      max-width: 300px;
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