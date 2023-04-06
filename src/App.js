import { useEffect, useState, useCallback } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'

import RegisterForm from './components/Forms/RegisterForm/RegisterForm'

import LoginForm from './components/Forms/LoginForm/LoginForm';

import { getStorage } from './utils/storage';

const App = () => {
  const [toggle, setToggle] = useState('');

  const changeToggle = (toggle) => setToggle(toggle)

  const checkIsInitStorage = () => getStorage('users') && getStorage('users').length !== 0

  const checkUserIsRegister = useCallback(() => {
    if (checkIsInitStorage()) {
      const userId = getStorage('id')
      const users = getStorage('users')

      const [userRegistered] = users.filter(user => user.id === userId)

      userRegistered.isLogin && changeToggle('panel')
      !userRegistered.isLogin && changeToggle('login')
    } else changeToggle('register')
  }, [])

  useEffect(() => {
    checkUserIsRegister()
  }, [checkUserIsRegister])


  return (
    <>
      {toggle === 'register' && <RegisterForm onRegister={checkUserIsRegister} onLogin={changeToggle} />}
      {toggle === 'login' && <LoginForm onRegister={changeToggle} onLogin={checkUserIsRegister} />}
    </>
  )
}

export default App