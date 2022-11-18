import React, { useEffect, useContext } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import { MEDIA_QUERY_DESKTOP, MEDIA_QUERY_MOBILE } from './constants.js';
import { MediaProvider } from "./context/MediaContext.js"
import { UserContext } from './context/HandleUser.js';
import { Alert, AlertIcon } from '@chakra-ui/react'
import { GetAuthUser } from "./fetchers/GetAuthUser.js"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Pesquisa } from './pages/Pesquisa/index.js';
import { Login } from './pages/Login/index.js';
import { Gestao } from './pages/Gestao/index.js';

function App() {
  const [isMobile, isDesktop] = useMediaQuery([MEDIA_QUERY_MOBILE, MEDIA_QUERY_DESKTOP]);
  const mediaType = { isMobile, isDesktop };
  const { setAuthenticate, loading, setLoading } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const storageToken = localStorage.getItem("token");
      const response = await GetAuthUser(storageToken);
      if (response.status === 200) {
        setLoading(false);
        if (window.location.pathname === "/login") {
          window.location.href = "gestao"
        } else {
          setAuthenticate(true)
        }
      } else if (response.status !== 200 && window.location.pathname !== "/login") {
        window.location.href = "login"
      } else {
        setLoading(false);
      }
    })()
  })

  if (loading) {
    return (
      <Alert status='info' >
        <AlertIcon />
        Estamos verificando suas credenciais, Aguarde!
      </Alert >)
  }

  return (
    <MediaProvider mediaType={mediaType}>
      <BrowserRouter>
        <Routes>
          <Route path="/pesquisas" element={<Pesquisa />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gestao" element={<Gestao />} />
          <Route path="*" element={<Gestao />} />
        </Routes>
      </BrowserRouter>
    </MediaProvider>
  );
}

export default App;
