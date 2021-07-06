import axios from 'axios';

export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  console.log("t", category)

  
  
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  });
  axios
  .get(
    `api/item?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`
  )
  .then(({ data }) => {
    const arr = []
    data.map( (i) => {
      
      return arr.push(i);
      
    })
    dispatch(setPizzas(arr))
    
  });
};

export const setPizzas = (items) => (

  {
  
  type: 'SET_PIZZAS',
  payload: items,
});
/*axios
    .get(
      `/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`,
    )
    .then(({ data }) => {
      dispatch(setPizzas(data));
    }); */


    /*axios
  .get(
    'api/item'
  )
  .then(({ data }) => {
    
    const arr = []
    data.map( (i) => {
      
      return arr.push(i);
      
    })
    dispatch(setPizzas(arr))
    
  });*/