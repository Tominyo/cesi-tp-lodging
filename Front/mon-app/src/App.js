import React, { useState, createContext, useEffect } from "react"
import './App.css';
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import { 
  BrowserRouter, 
  Routes, 
  Route,   
  createBrowserRouter,
  RouterProvider, 
} from "react-router-dom";
import ContactScreen from "./views/ContactScreen";
import LodgingScreen from "./views/LodgingScreen";
import Custom404Screen from "./views/Custom404Screen";
import Header from "./components/Header";
import Cookies from 'js-cookie';
import { getCookie } from "./utils/Utils";
import AdminScreen from "./views/AdminScreen";

export const UserContext = createContext();
export const AuthContext = createContext();

const fakeUser = {
  "id": "1234",
  "username": "Tommy",
  "email": "tommy@mail.com",
  "isAdmin": true
}

function App() {
  const [currentPage, setCurrentPage] = useState("/");
  const [currentUser, setCurrentUser] = useState(fakeUser)
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
        
    //console.log(username)
    //setUsername(Cookies.get('username'))

    if(!isLogin)
    {
      if(Cookies.get('userID'))
      {
        console.log(getCookie("userID"))
        getUserById(Cookies.get('userID'))
        setIsLogin(true);
      }
      else
      {
        setCurrentUser(null)
        setIsLogin(false);
      }

    }
    
    
    if(Cookies.get('jwt'))
    {
      setIsAdmin(true)
    }
    else
    {
      setIsAdmin(false)
    }
    

    }, [])

    
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen />,
      //loader: rootLoader,
      children: [
        {
          path: "lodging/:id",
          element: <LodgingScreen />,
          //loader: eventLoader,
        },
      ]
    },
    {
      path: "/login",
      element: <LoginScreen />,
      //loader: rootLoader,
    },
  ]);

  const routere = () => {
    switch(currentPage)
    {
      case "/":
        return <HomeScreen setCurrentPage={setCurrentPage}/>;
        break;

      case "/Login":
        return <LoginScreen setCurrentPage={setCurrentPage}/>;
        break;

      default:
        return <HomeScreen setCurrentPage={setCurrentPage}/>;
    }
  }

  const getUserById = (userID) => {

    let headers = new Headers();

    //headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    headers.append('Origin','http://localhost:3001');
    //headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
    //headers.append('Access-Control-Allow-Credentials', 'true');
    //https://api.publicapis.org/entries

    fetch(`http://localhost:3001/api/users/${userID}`,{
        mode: 'cors',
        credentials: 'include',
        method: 'GET',
        headers: headers
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
       setCurrentUser(result)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
     
      }
    )

    let fakeUser2 = {
      "id": "1234",
      "username": "Tommy",
      "email": "tommy@mail.com",
      "isAdmin": true
    }
    
  }

  return (
  <AuthContext.Provider value={{ isLogin: [isLogin, setIsLogin], isAdmin: [isAdmin, setIsAdmin] }}>
       <UserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
                <Route index element={<HomeScreen />} />
                <Route path="login" element={<LoginScreen/>} />
                <Route path="contact" element={<ContactScreen />} />
                <Route path="lodging/:id" element={<LodgingScreen />} />
                {/*<Route path="admin" element={<AdminScreen/>} /> */}
                <Route path="*" element={<Custom404Screen />} />
              </Route>
          </Routes>
        </BrowserRouter>
    </UserContext.Provider>
  </AuthContext.Provider>
   
  );
}

export default App;
