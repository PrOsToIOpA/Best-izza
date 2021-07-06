import React, { useContext, useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import '../scss/profile.css'
import {  useHistory } from 'react-router-dom';

import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';


function Profile() {

   const history = useHistory()
  const message = useMessage();
  const { request, error, clearError } = useHttp();
  const auth = useContext(AuthContext);
  console.log("au", auth)
  const [form, setForm] = useState({
    email: 'email@gmail.com',
    password: '',
    name: 'Имя',
    lastName: 'Фамилия',
    phone: '380990909090',
    adress: 'Запорожье',
  });
  

  const updateHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      console.log('411')
      const data = await request('/api/auth/register', 'POST', { ...form });
      console.log('511')
      message(data.message);
      history.push('/');
    } catch (error) {}
  };
   return (
      <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
            <div class="col-xl-12 col-md-12">
                <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> 
                                <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"/> 
                                </div>
                                <h6 class="f-w-600">Имя Фамилия</h6>
                                <p>Хороший Покупатель</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-block">
                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Информация</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Email</p>
                                        <h6 class="text-muted f-w-400">rntng@gmail.com</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Телефон</p>
                                        <h6 class="text-muted f-w-400">380990901865</h6>
                                    </div>
                                </div>
                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Остальное</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Адресс</p>
                                        <h6 class="text-muted f-w-400">Sam Disuja</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Пароль</p>
                                        <h6 class="text-muted f-w-400">Пароль</h6>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
   )
}

export default Profile
