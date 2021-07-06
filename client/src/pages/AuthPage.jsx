import React, { useContext, useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import {  useHistory } from 'react-router-dom';

import { Card, Container, Form, Row } from 'react-bootstrap';

import { Button } from '../components';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

function AuthPage() {
  const history = useHistory()
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: 'email@gmail.com',
    password: '',
    name: 'Имя',
    lastName: 'Фамилия',
    phone: '380990909090',
    adress: 'Запорожье',
  });
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      console.log('411')
      const data = await request('/api/auth/register', 'POST', { ...form });
      console.log('511')
      message(data.message);
      history.push('/');
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.id);
      history.push('/');
    } catch (error) {}
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 350 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Авторизація</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            id="em"
            className="mt-3"
            placeholder="Введите ваш email..."
            name="email"
            onChange={changeHandler}
          />

          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль..."
            name="password"
            type="password"
            onChange={changeHandler}
          />

          <Row className="mt-3 d-flex justify-content-between pl-3 pr-3">
            <Button onClick={registerHandler} disabled={loading}>
              Зареєструватися
            </Button>

            <Button onClick={loginHandler} disabled={loading}>
              Ввійти
            </Button>
          </Row>
        </Form>
      </Card>
      <div
        style={{ display: 'none' }}
        className="alert alert-warning alert-dismissible fade show"
        role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </Container>
  );
}

export default AuthPage;
