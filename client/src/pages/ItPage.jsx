import React, { useState, useEffect} from 'react';
import { useHttp } from '../hooks/http.hook';

import { Card, Container, Form, Row } from 'react-bootstrap';

import { Button } from '../components';
import { useMessage } from '../hooks/message.hook';
import LoadingBlock from '../components/PizzaItem/LoadingBlock';

export const ItPage = ({ getItem, getCategory, items, cutegories }) => {
  const myRef = React.createRef(0);
  const myRefС = React.createRef(0);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    name: '',
    newName: '',
    imageUrl: '',
    types: [],
    sizes: [],
    prices: {},
    category: '',
  });
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  
  const changeHandlerObj = (event) => {
    const y = event.target.value
    setForm({
      ...form,
      
      [event.target.name]: JSON.parse(`{${y}}`),
      
    });
    console.log('Obj',event.target.name)
    console.log('Obj1',typeof JSON.parse(`{${y}}`))
  };
  const changeHandlerArr = (event) => {

     setForm({
       ...form,
       [event.target.name]: event.target.value.split(','),
       
     });
     console.log('1',event.target.value.split(','))
   };
  const changeHandler = (event) => {
  console.log("yura",myRefС.current.value);
   if(myRef.current && event.target.value) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
      category: myRefС.current.value,
      name: myRef.current.value,
      
    });
   }
   else {
      setForm({
         ...form,
         [event.target.name]: event.target.value,
         category: myRefС.current.value,
         name: event.target.value,
         
       });
   }
  };

  

  const addHandler = async (event) => {
    try {
      //event.preventDefault();

      const data = await request('/api/item/add', 'POST', { ...form });
      message(data.message);
      getItem()
    getCategory()
    } catch (error) {}
  };
  const updateHandler = async (event) => {
    try {
      const data = await request('/api/item/update', 'POST', { ...form });
      message(data.message);
      getItem()
    getCategory()
    } catch (error) {}
  };

  const deleteHandler = async (event) => {
    try {
      await setForm({
         ...form,
         name: myRef.current.value,
         category: myRefС.current.value,
       });
      const data = await request('/api/item/delete', 'POST', { ...form });

      message(data.message);
      getItem()
    getCategory()
    } catch (error) {}
  };
 


  if (!items.length) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 350 }}>
        <Card style={{ width: 600 }} className="p-5">
          <h2 className="m-auto">Пиццы</h2>
          <Form className="d-flex flex-column">
            <Form.Control
              id="em"
              className="mt-3"
              placeholder="Введите новую пиццу"
              name="newName"
              onChange={changeHandler}
            />
            <Form.Control
              id="em"
              className="mt-3"
              placeholder="Введите адрес картинки"
              name="imageUrl"
              onChange={changeHandler}
            />
            <Form.Control
              id="em"
              className="mt-3"
              placeholder="Введите размеры"
              name="sizes"
              onChange={changeHandlerArr}
            />
            <Form.Control
              id="em"
              className="mt-3"
              placeholder="Введите типы теста"
              name="types"
              onChange={changeHandlerArr}
            />
            <Form.Control
              id="em"
              className="mt-3"
              placeholder="Введите цены"
              name="prices"
              onChange={changeHandlerObj}
            />
            <Form.Control id="em" className="mt-3" as="select" ref={myRefС} onChange={changeHandler}>
              {cutegories &&
                cutegories.map((cutegory) => <option value={cutegory._id}>{cutegory.name}</option>)}
            </Form.Control>
            <Row className="mt-3 d-flex justify-content-between pl-3 pr-3">
              <Button onClick={addHandler} disabled={loading}>
                Добавить
              </Button>
            </Row>
          </Form>
        </Card>
      </Container>
    );
  }

  if (loading) {
    return <LoadingBlock />;
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 350 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Пиццци</h2>
        <Form className="d-flex flex-column">
          <Form.Control id="em" className="mt-3" as="select" ref={myRef}>
            {items && items.map((item) => <option value={item.name}>{item.name}</option>)}
          </Form.Control>

          <Form.Control
            id="em"
            className="mt-3"
            placeholder="Введите пиццу"
            name="newName"
            onChange={changeHandler}
          />
          <Form.Control
            id="em"
            className="mt-3"
            placeholder="Введите адрес картинки"
            name="imageUrl"
            onChange={changeHandler}
          />
          <Form.Control
            id="em"
            className="mt-3"
            placeholder="Введите размеры"
            name="sizes"
            onChange={changeHandlerArr}
          />
          <Form.Control
            id="em"
            className="mt-3"
            placeholder="Введите типы теста"
            name="types"
            onChange={changeHandlerArr}
          />
          <Form.Control
            id="em"
            className="mt-3"
            placeholder="Введите цены"
            name="prices"
            onChange={changeHandlerObj}
          />
          <Form.Control id="em" className="mt-3" as="select" ref={myRefС} onChange={changeHandler}>
            {cutegories &&
              cutegories.map((cutegory) => <option value={cutegory._id}>{cutegory.name}</option>)}
          </Form.Control>
          <Form.Group className="d-flex justify-content-between">
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
    </Container>
  );
};
