import React, { useState, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';

import { useMessage } from '../hooks/message.hook';
import { ItPage } from './ItPage';

function ItemPage() {
   const [cutegories, setCategory] = useState([])
  const [items, setItems] = useState([])
  const message = useMessage();
  const { request, error, clearError } = useHttp();
 
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const getCategory = useCallback(
   async () => {
     try {
      const data = await request('api/category', 'GET', null)
      console.log('51', data)
      setCategory(data)
     } catch (error) {
       
     }
   },
   [request]
 )


  const getItem = useCallback(
    async () => {
      try {
       const data = await request('api/item', 'GET', null)
       setItems(data)
      } catch (error) {
        
      }
    },
    [request]
  )
  useEffect(() => {
    getItem()
    getCategory()
    
    
  }, [getItem, getCategory]);
  console.log('987', {items})



    return (
          <ItPage getItem={getItem} getCategory={getCategory} items={items} cutegories={cutegories}/>
          

    );
  }

  
export default ItemPage
