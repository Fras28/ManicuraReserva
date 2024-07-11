import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPrestadores, fetchReservas } from './components/redux/slice.jsx';
import Landing from './components/Landing/Landing.jsx';


import Calendario from './components/Calendario.jsx';
import EditUser from './components/Results/EditUser.jsx';
import Exito from './components/Results/Exito.jsx';
import SignupCard from './components/Autenticacion/SignUp.jsx';
import SimpleCard from './components/Autenticacion/LogIn.jsx';
import UserProfile from './components/Autenticacion/Perfil.jsx';
import Error from './components/Results/Error.jsx';
import NotFound from './components/Results/NotFound.jsx';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservas());
    dispatch(fetchPrestadores());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Calendario />} />
        <Route path="/register" element={<SignupCard />} />
        <Route path="/login" element={<SimpleCard />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/error" element={<Error />} />
        <Route path="/Exito" element={<Exito />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
