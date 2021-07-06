import React from 'react';
import { Categories, SortPopup, PizzaItem, PizzaLoadingItem } from '../components';
import CustomChatbot from "../components/chatbot/CustomChatbot";


import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { fetchCategs } from '../redux/actions/categs';
const sortItems = [
  { name: 'алфавиту(А-Я)', type: 'name', order: '1' },
  { name: 'цене(0-1)', type: 'price', order: '1' },
  { name: 'алфавиту(Я-А)', type: 'name1', order: '-1' },
  { name: 'цене(1-0)', type: 'price1', order: '-1' },
];

function Home() {
  const dispatch = useDispatch();

  const items = useSelector(({ pizzas }) => pizzas.items);
  
  const items1 = useSelector(({ categs }) => categs.items);

  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const isLoaded1 = useSelector(({ categs }) => categs.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);






  React.useEffect(() => {
    dispatch(fetchCategs());
    dispatch(fetchPizzas(sortBy, category));
   
  }, [category, sortBy]);


  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);
  

  const handleAddPizza = (obj) => {
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj,
    });
  };
 
  return (
    <div className="container">
      <div className="content__top">
        {isLoaded1 
        ? <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={items1}
        />
         :<p>Hello</p>}
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        /> 
        
      </div>
      <h2 className="content__title" style={{textAlign:"center"}}>Мясные пиццы</h2>
      <div className="content__items">
      
      
    {isLoaded
          ? items.map((obj) => (
              <PizzaItem
                onClickAddPizza={handleAddPizza}
                key={obj.id}
                addedCount={cartItems[obj._id] && cartItems[obj._id].items.length}
                {...obj}
              />
            ))
          : Array(10)
              .fill(0)
              .map((_, index) => <PizzaLoadingItem key={index} />)}
          </div>
          <CustomChatbot />
    </div>
  );
}

export default Home;
/** 
 * <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        /> 
 * {isLoaded
          ? items.map((obj) => (
              <PizzaItem
                onClickAddPizza={handleAddPizza}
                key={obj.id}
                addedCount={cartItems[obj._id] && cartItems[obj._id].items.length}
                {...obj}
              />
            ))
          : Array(10)
              .fill(0)
              .map((_, index) => <PizzaLoadingItem key={index} />)}*/