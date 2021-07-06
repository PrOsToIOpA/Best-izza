import React, { useState, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';


import { useMessage } from '../hooks/message.hook';
import { Lst } from './Lst';

function CategoryPage() {
  const [cutegories, setCategory] = useState([])
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
       setCategory(data)
      } catch (error) {
        
      }
    },
    [request]
  )
  useEffect(() => {
    getCategory()
    
    
  }, [getCategory, ]);

  

    return (
          <Lst getCategory={getCategory} cutegories={cutegories}/>
          

    );
  }

  

export default CategoryPage;
