import React, {  useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';

import { Card, Container, Form, Row } from 'react-bootstrap';

import { Button } from '../components';
import { useMessage } from '../hooks/message.hook';
import LoadingBlock from '../components/PizzaItem/LoadingBlock';

export const Lst = ({ getCategory, cutegories }) => {
  const myRef = React.createRef(0);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    name: '',
    newName: '',
  });
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    if(myRef.current && event.target.value) {
      setForm({ name: myRef.current.value, newName: event.target.value });
    }
    else {
      setForm({ name: event.target.value, newName: event.target.value });
    }
    
  };

  const addHandler = async (event) => {
    try {
      const data = await request('/api/category/add', 'POST', { ...form });
      message(data.message);
      getCategory()
    } catch (error) {}
  };
  const updateHandler = async (event) => {
    try {
      const data = await request('/api/category/update', 'POST', { ...form });
      message(data.message);
      getCategory();
    } catch (error) {}
  };

  const deleteHandler = async (event) => {
    try {
      const data = await request('/api/category/delete', 'POST', { ...form });

      message(data.message);
      getCategory()
    } catch (error) {}
  };
  
 

  if (!cutegories.length) {
    return (<Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 350 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Категории</h2>
        <Form className="d-flex flex-column">
          
           
         
          <Form.Control
            id="em"
            className="mt-3"
            placeholder="Введите новую категорию"
            name="newName"
            onChange={changeHandler}
          />
          <Row className="mt-3 d-flex justify-content-between pl-3 pr-3">
            <Button onClick={addHandler} disabled={loading}>
              Добавить
            </Button>

            
          </Row>
        </Form>
      </Card>
      
    </Container>);
  }

  if (loading) {
    return <LoadingBlock />;
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 350 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Категории</h2>
        <Form className="d-flex flex-column">
          <Form.Control id="em" className="mt-3" as="select" ref={myRef}>
            {cutegories &&
              cutegories.map((cutegory) => <option value={cutegory.name}>{cutegory.name}</option>)}
          </Form.Control>
         
          <Form.Control
            id="em"
            className="mt-3"
            placeholder="Введите новую категорию"
            name="newName"
            onChange={changeHandler}
          />
          <Form.Group className="d-flex justify-content-between" 
          >
            <Button onClick={addHandler} disabled={loading}>
              Добавить
            </Button>

            <Button onClick={deleteHandler} disabled={loading}>
              Удалить
            </Button>
            <Button onClick={updateHandler} disabled={loading}>
              Изменить
            </Button>
          </Form.Group>
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
};
