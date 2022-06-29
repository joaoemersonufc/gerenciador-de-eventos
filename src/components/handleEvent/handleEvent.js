import 'font-awesome/css/font-awesome.min.css';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FiDelete } from 'react-icons/fi';
import DatePicker from 'rsuite/DatePicker';
import "rsuite/dist/rsuite.min.css";
import ptBR from 'rsuite/locales/pt_BR';
import styled from 'styled-components';
import { useEvent } from '../../contexts/Event/Context';
import { validationSchema } from '../handleEvent/validationEvent';


export default function EventForm() {
    const [sessions, setSessions] = useState([]);

    const initialValues = {
        startDate: new Date(),
        description: '',
        name: '',
        eventType: '',
        placeId: null,
        fullTicketValue: null,
        sessions: [],
    };

    const { setEvent, getPlaces, places } = useEvent();
    
    const handleEvent = (e) => {
        const newSessions = sessions.map(s => {
            const formatDate = new Date (s.date);
            const day = formatDate.getDate() < 10 ? `0${formatDate.getDate()}` : formatDate.getDate();
            const month = (formatDate.getMonth() + 1) < 10 ? `0${formatDate.getMonth() + 1}` : formatDate.getMonth() + 1;
            const year  = formatDate.getFullYear();
            const date = `${year}-${month}-${day}`;
            
        s.placeId = Number(e.placeId); s.fullTicketValue = e.fullTicketValue; s.date = `${date} ${formatDate.toString()?.split(' ')[4]}`; return s})
        setEvent({description: e.description, name: e.name, eventType: e.eventType, sessions: newSessions})
    }

    const { handleSubmit, values, handleChange, dirty, isValid } = useFormik({
        validationSchema,
        initialValues,
        onSubmit: (e) => handleEvent(e),
    });

    const handleSession = (date) => {
        if(sessions.length < 3){
            setSessions([...sessions, {date}]);
        }
    }

    const handleDelete = (id) => {
        setSessions(sessions.filter((_, index) => index !== id));
    }
    
    const ranges = [
        {
          label: 'Agora',
          value: new Date()
        }
      ];

    const stringToDateTime = ( value, month ) => {
          const date = new Date(value).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: month || 'long',
              year: 'numeric',
          });
          const time = new Date(value).toLocaleTimeString();
      
          return `${date} ${time}`;
    }

    useEffect(() => {
        getPlaces();
    }, [])

    return (
        <Container>
            <Content>
                <h1>Cadastro de evento</h1>
                <SessionsList>
                    {sessions.map((s, index) => {
                        return (
                            <Sessions>
                                {stringToDateTime(new Date(s.date))}
                                <FiDelete style={{color: '#fff', fontSize: '20px', cursor: 'pointer'}} onClick={() => handleDelete(index)}/> 
                            </Sessions>
                        )
                    })}
                </SessionsList>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <InputDate>
                                <h4>Selecione o dia e horário da sessão</h4>
                                <DatePicker
                                    id="date"
                                    format="dd MMM yyyy hh:mm:ss aa"
                                    showMeridian
                                    ranges={ranges}
                                    locale={ptBR}
                                    style={{ width: 260 }}
                                    onChange={handleSession}
                                />
                            </InputDate>
                            <InputIcon>
                                <Input type="name" name="name" placeholder="Qual o nome de evento?" value={values.name} onChange={handleChange} />
                            </InputIcon>
                            <InputIcon>
                                <Input type="eventType" name="eventType" placeholder="Qual o tipo de evento?" value={values.eventType} onChange={handleChange} />
                            </InputIcon>
                            <InputIcon>
                                <TextArea name="description" placeholder="Digite uma descrição para o evento" value={values.description} onChange={handleChange} />
                            </InputIcon>
                            <InputIcon className='row'>
                                <Input name="fullTicketValue" type="number" placeholder="Digite um preço para os tickets do evento" value={values.fullTicketValue} onChange={handleChange} />
                                <select name="placeId"placeholder="Selecione o local" value={values.placeId} onChange={handleChange} >
                                    {places.map(place => 
                                        <option value={Number(place.id_local)}>{place.ds_local}</option>
                                    )}
                                </select>
                            </InputIcon>
                        </div>
                    </div>
                    <ButtonList>
                        <Button disabled={!dirty || !isValid || !values.placeId || !values.fullTicketValue}>Cadastrar</Button>
                    </ButtonList>
                </Form>
            </Content>
        </Container>
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

    h1{
        text-align: center;
        color: #fff;
    }
`

const ButtonList = styled.div`
    display: flex;
    flex-flow: row;
    width: 100%;
    button{
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
`;

const SessionsList = styled.div`
    width: 100%;
    justify-content: space-around;
    display: flex;
    flex-direction: row;
`

const Sessions = styled.div`
    padding: 20px;
    width: 50%;
    margin-top: 10px;
    margin: 10px;
    display: flex;
    color: #fff;
    align-items: center;
    flex-direction: row;
    background-color: #090b13;
    border-radius: 10px;
    overflow: hidden;
    justify-content: space-between;
    font-size: 12px;

    svg{ 
        padding-left: 5px;
    }

    @media (max-width: 900px) {
        width: 90%;
        flex-direction: column;
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

    &.row{
        display: flex;
        flex-flow: row;

        input{
            margin: 5px;
        }
    }

    select{
        margin: 5px;
        width: 200px;
        color: #fff;
        border: 1px solid rgba(255,255,255,.1);
        background: #333;
    }
`

const InputDate = styled.div`
    width: 100%;
    justify-content: space-between;
    display: flex;
    flex-flow: row;
    color: rgb(118, 118, 118);
    margin-bottom: 15px;
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
    h4{
        font-size: 14px;
        font-weight: normal;
    }
`

const Input = styled.input`
    width: 100%;
    color: white;
    margin-bottom: 15px;
    font-size: 14px;
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
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    &[type=number] {
    -moz-appearance: textfield;
    }
`

const TextArea = styled.textarea`
    width: 100%;
    color: white;
    margin-bottom: 15px;
    font-size: 14px;
    padding: 15px 0;
    padding-right: 15px;
    padding-left: 45px;
    resize: none;
    background: #333;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: $borderRadius;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
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

    &:disabled {
        background-color: #c4c4c4;
        pointer-events: none;
    }

    &:hover {
        background: #0483ee;
    }
`

const Form = styled.form`
    margin-top: 30px;
`