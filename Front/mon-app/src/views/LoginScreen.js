import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import "./LoginScreen.css";

function LoginScreen(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pageIndex, setPageIndex] = useState(0)
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("success")

  let timer

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const login = (email, password) => {
    let headers = new Headers();

        //headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
        headers.append('Origin','http://localhost:3001');
        //headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
        //headers.append('Access-Control-Allow-Credentials', 'true');
        //https://api.publicapis.org/entries

        fetch(`http://localhost:3001/auth/login`,{
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(
          (result) => {
            //console.log(result)
           //setLodgings(result)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
         
          }
        )
  }

  const showAlert = (content, type="success") => {

    setAlertMessage(content)
    setSeverity(type)
    handleClick()
  }

  // JSX code for login form
  const renderFormLogin = (

    <div className="app">
    <div className="login-form">
      <div className="title">Connexion</div>
      <div className="form">
      <form action="http://localhost:3001/auth/login" method="post">
        <div className="input-container">
          <label>E-mail </label>
          <input type="text" name="email" id="email" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" id="password" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>

        <div className="button-container" style={{marginTop: "20px"}}>
          <Button title="Pas de compte ? Inscrivez vous ici" onClick={() => {setPageIndex(1)}}>Pas de compte ? Inscrivez vous ici</Button>
        </div>

      </form>
     
    </div>
      {/*isSubmitted ? <div>User is successfully logged in</div> : renderForm*/}
    </div>
    
  </div>

  );

  const renderFormRegister = (
    <div className="app">
    <div className="login-form">
      <div className="title">INSCRIPTIONS</div>
      <div className="form">
      <form action="http://localhost:3001/auth/register" method="post">
        <div className="input-container">
          <label>E-mail </label>
          <input type="text" name="email" id="email" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="username" id="username" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" id="password" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        <div className="button-container" style={{marginTop: "20px"}}>
          <Button title="Vous avez déjà un compte ? connectez vous ici" onClick={() => {setPageIndex(0)}}>Vous avez déjà un compte ? connectez vous ici</Button>
        </div>
      </form>
    </div>
      {/*isSubmitted ? <div>User is successfully logged in</div> : renderForm*/}
    </div>
  </div>
  );

  return (
    <>
    
      <main>
          {
          pageIndex === 0
            ? renderFormLogin
            : renderFormRegister
          }
      </main>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
              {alertMessage}
            </Alert>
        </Snackbar>

    </>
  );
}

export default LoginScreen;