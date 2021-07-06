
import axios from 'axios';



export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});
//const arr = []
export const fetchCategs = () => (dispatch) => {
  
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  });
  axios
    .get(
      'api/category'
    )
    .then(({ data }) => {
      const arr = []
      data.map( (i) => {
        return arr.push(i);
        
      })
      dispatch(setCategs(arr))
      
    });
};

export const setCategs = (items) => (
  {
  
  type: 'SET_CATEGS',
  payload: items,
});
/*axios
    .get(
      `/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`,
    )
    .then(({ data }) => {
      dispatch(setPizzas(data));
    }); */