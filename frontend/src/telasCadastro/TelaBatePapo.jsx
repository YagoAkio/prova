import { Container } from "react-bootstrap";
import { Form, Row, Col, Button, FloatingLabel, Spinner } from 'react-bootstrap';

export default function TelaBataPapo(props){
    return (
        <Container>
          <Row>
            <Col>
              <h1>Chat</h1>
              {/* <ListGroup>
                {messages.map((message, index) => (
                  <ListGroup.Item key={index}>{message}</ListGroup.Item>
                ))}
              </ListGroup> */}
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Digite sua mensagem..."
                    //value={newMessage}
                    //onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" /*onClick={EnviarMensagem}*/>
                  Enviar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      );
}