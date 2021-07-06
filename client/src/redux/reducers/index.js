import { combineReducers } from 'redux';

import filters from './filters';
import pizzas from './pizzas';
import categs from './categs';
import cart from './cart';

const rootReducer = combineReducers({
   filters,
   pizzas,
   cart, 
   categs
});

export default rootReducer;