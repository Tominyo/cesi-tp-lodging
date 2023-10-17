import { Outlet, Link } from "react-router-dom";
import React, {useContext, useState} from 'react'
import { AuthContext, UserContext } from '../App';
import { Button } from "@mui/material";
import Header from './Header';
import Footer from './Footer';

export default function Home() {

    return (
      <>
        <Header />
        
        <Outlet />
  
        <Footer />
  
      </>
    )
}
