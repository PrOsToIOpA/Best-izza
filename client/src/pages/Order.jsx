import React, { useEffect } from 'react'
import { Button } from '../components';

function Order({getOrder, orders}) {
   useEffect(() => {
      getOrder()
   }, []);
   return (
      <table class="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Имя</th>
      <th scope="col">Номер Телефона</th>
      <th scope="col">Адресс</th>
      <th scope="col-2">Товары</th>
      <th scope="col">Количество</th>
      <th scope="col">Итого</th>
    </tr>
  </thead>
  <tbody>
     {orders && orders.map((ord, index) => (
      <tr>
      <th scope="row">{index}</th>
      <td>{orders[index].name}</td>
      <td>{orders[index].phone}</td>
      <td>{orders[index].adress}</td>
      <td>{orders[index].goods[0][Object.keys(orders[index].goods[0])].items[0].name+" "+orders[index].goods[0][Object.keys(orders[index].goods[0])].items[0].type+" "+ orders[index].goods[0][Object.keys(orders[index].goods[0])].items[0].size}</td>
      <td>{orders[index].totalCount}</td>
      <td>{orders[index].totalPrice}</td>
    </tr>
     ))}
    
    
  </tbody>
  <Button>Принять заказ</Button>
</table>

      
   )
}

export default Order

