import { Outlet, Link } from "react-router-dom";
import React, {useContext, useState} from 'react'
import { AuthContext, UserContext } from '../App';
import { Button } from '@mui/material';


const Header = () => {

  const { isLogin, isAdmin } = React.useContext(AuthContext);
  const currentUser = useContext(UserContext);

  const [lodgings, setLodgings] = useState([]);
  const [stateIsAdmin, setStateIsAdmin] = isAdmin;
  const [stateIsLogin, setStateIsLogin] = isLogin;

  const logout = () => {
    let headers = new Headers();

    //headers.append('Content-Type', 'application/json');
    //headers.append('Accept', 'application/json');
    //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    //headers.append('Origin','http://localhost:3001');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
    headers.append('Access-Control-Allow-Credentials', 'true');
    //https://api.publicapis.org/entries

    console.log("SISI")
    fetch(`http://localhost:3001/auth/logout`,{
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers: headers
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        setStateIsLogin(false)
        setStateIsAdmin(false)
        refreshPage()
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
     
      }
    )
  }

  return (
    <>
    <header>
        <nav className="menu">
        <a href="/"><img src="/img/logo.png" width="150" alt="Logo du site"/></a>
           {
            isAdmin !== undefined && isLogin !== undefined && currentUser !== undefined
            ?  
              <ul>
                  
                  <li>
                      {
                        stateIsLogin
                        ? <div className="center-xy flex-col">
                            <Button variant="contained" onClick={logout}>Se déconnecter</Button>
                                              
                              {
                                  //user.isAdmin === true
                                    stateIsAdmin
                                  ? <li> <a href="http://localhost:3001/admin">Admin </a></li>
                                  : <></>
                              } 

                          </div>
                        : <Link to="/login">Connexion</Link>
                      } 
                  </li>

              </ul>
            : <></>
           }
        </nav>
    </header>

    </>
  )
};

export default Header;

function refreshPage() {
  window.location.reload(false);
}