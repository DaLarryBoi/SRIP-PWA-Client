import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import CreateTransaction from './pages/CreateTransaction';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Edit from './pages/Edit';

import { useReducer } from 'react';
import SessionStore from './store';
import { SessionContext, SessionDispatchContext } from './Contexts';
import { sessionReducer } from './Reducers';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

export default function App() {
  let [session, sessionDispatch] = useReducer(sessionReducer, {
    loggedIn: true ? SessionStore.username !== null : false,
    username: SessionStore.username,
    id: SessionStore.id,
  });
  
  return (
    <BrowserRouter>
    <SessionContext.Provider value={session}>
    <SessionDispatchContext.Provider value={sessionDispatch}>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="create" element={<CreateTransaction />} />
          <Route path="search" element={<Search />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="edit" element={<Edit />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      </SessionDispatchContext.Provider>
      </SessionContext.Provider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register(); //change the service worker registration from 'unregistered' to 'registered'

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
