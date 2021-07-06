import React, { useState, useEffect, useCallback } from 'react';
import { Order } from '.';
import { useHttp } from '../hooks/http.hook';


import { useMessage } from '../hooks/message.hook';

function OrderPage() {
  const [orders, setOrder] = useState([])
  const message = useMessage();
  const { request, error, clearError } = useHttp();
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, [])




  const getOrder = useCallback(
    async () => {
      try {
       const data = await request('api/order', 'GET', null)
       console.log("tuta")
       setOrder(data)
      } catch (error) {
        
      }
    },
    [request]
  )
  useEffect(() => {
    getOrder()
    
    
  }, [getOrder, ]);

  

    return (
          <Order getOrder={getOrder} orders={orders}/>
          

    );
  }
  export default OrderPage;
