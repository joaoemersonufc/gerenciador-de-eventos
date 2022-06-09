import 'font-awesome/css/font-awesome.min.css';
import { useFormik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'rsuite/DatePicker';
import "rsuite/dist/rsuite.min.css";
import ptBR from 'rsuite/locales/pt_BR';
import styled from 'styled-components';
import { useEvent } from '../../contexts/Event/Context';

let sessions = [];

export default function EventForm() {

    const initialValues = {
        startDate: new Date(),
        description: '',
        eventType: '',
        sessions: [],
    };

    const { setEvent } = useEvent();
    
    const handleEvent = (e) => {
        setEvent(e.description, e.eventType, e.sessions)
    }

    const { handleSubmit, values, handleChange } = useFormik({
        initialValues,
        onSubmit: (e) => handleEvent(e),
    });

    const handleSession = (date) => {
        if(sessions?.length){
            if(sessions?.find(session => date === session)){

                console.log(sessions)
                sessions = sessions.filter(session => date !== session)
                return date
            }
        }

        console.log(sessions)
        sessions.push(date)
        return date
    }
    
    const ranges = [
        {
          label: 'Agora',
          value: new Date()
        }
      ];

    return (
        <Container>
            <Content>
                <h1>Cadastro de evento</h1>
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
                                <Input type="eventType" name="eventType" placeholder="Qual o tipo de evento?" value={values.eventType} onChange={handleChange} />
                            </InputIcon>
                            <InputIcon>
                                <TextArea name="description" placeholder="Digite uma descrição para o evento" value={values.description} onChange={handleChange} />
                            </InputIcon>
                            {sessions?.length > 0 ? sessions.map(session => <Session>{session}</Session>) : <></>}
                        </div>
                    </div>
                    <Button>Cadastrar</Button>
                </Form>
            </Content>
        </Container>
    )

}

const Container = styled.div`
    position: relative;
    height: calc(100vh - 140px);
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

const Session = styled.div`
    padding: 20px;
    width: 150px;
    width: 150px;
    display: flex;
    flex-direction: column;
    background: rgba(0,0,0,0.8);
    border-radius: 10px;
    overflow: hidden;

    @media (max-width: 900px) {
        width: 90%;
    }
`

const Content = styled.div`
    max-width: 650px;
    padding: 50px 40px;
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

    &:hover {
        background: #0483ee;
    }
`

const Form = styled.form`
    margin-top: 30px;
`