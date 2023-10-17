import React, {useState, useEffect} from 'react'
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import { OptionsToString, putData } from '../utils/Utils';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext, UserContext } from '../App';

export default function MyReservationScreen(props) {

  const { isLogin, isAdmin } = React.useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false)
  const [lodging, setLodging] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("success")

  const [stateIsAdmin, setStateIsAdmin] = isAdmin;
  const [stateIsLogin, setStateIsLogin] = isLogin;
  
  const navigate = useNavigate();
  const params = useParams();

  let timer

  const onBackClicked = () => {
    navigate(-1)
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    let headers = new Headers();

    //headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    headers.append('Origin','http://localhost:3001');
    //headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
    //headers.append('Access-Control-Allow-Credentials', 'true');
    //https://api.publicapis.org/entries

    fetch(`http://localhost:3001/api/logements/${params.id}`,{
        mode: 'cors',
        credentials: 'include',
        method: 'GET',
        headers: headers
    })
    .then(res => res.json())
    .then(
      (result) => {
        ////console.log(result)
       setLodging(result)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
     
      }
    )

}, [])

const checkLodgingAvailability = async (lodging) => {
  let headers = new Headers();

    //headers.append('Content-Type', 'application/json');
    //headers.append('Accept', 'application/json');
    //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    //headers.append('Origin','http://localhost:3001');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
    headers.append('Access-Control-Allow-Credentials', 'true');
    //https://api.publicapis.org/entries

    fetch(`http://localhost:3001/api/reservation/${lodging.id}`,{
        mode: 'cors',
        credentials: 'include',
        method: 'GET',
        headers: headers
    })
    .then(res => res.json())
    .then(
      (result) => {
        ////console.log(result)

        if(result.userId !== undefined)
        {
            //console.log("Le logement est disponible")
            bookLodging(lodging)
        }
        else
        {
          //console.log("Le logement n'est plus disponible")
        }

      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
     
      }
    )
}

const updateLodging = (lodging) => {

  const url = `http://localhost:3001/api/logements/${lodging.id}`
  const data = {isAvailable: false }

  setIsLoading(true)

  putData(url, data).then((data) => {
    setIsLoading(false)
    const content = `Vous avez réserver le logement ${lodging.name} pour la période du 15/07 à 25/08`
    showAlert(content)

    if(timer == null)
        {
            timer = setTimeout(() => {
                
                //console.log('This will run after 3 second!')
                timer = null;
                refreshPage()

              }, 3000);
              return () => clearTimeout(timer);
        }

});
}

const bookLodging = () => {

  if(stateIsLogin)
  {
    let headers = new Headers();

    //headers.append('Content-Type', 'application/json');
    //headers.append('Accept', 'application/json');
    //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    //headers.append('Origin','http://localhost:3001');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
    headers.append('Access-Control-Allow-Credentials', 'true');
    //https://api.publicapis.org/entries

    fetch(`http://localhost:3001/api/reservation`,{
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers: headers
    })
    .then(res => res.json())
    .then(
      (result) => {
        //console.log(result)
        updateLodging(lodging)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
     
      }
    )
  }
  else {
    const content = `Vous devez être connecter afin de pouvoir réserver un logement !`
    showAlert(content, "warning")
  }

}

const showAlert = (content, type="success") => {

  setAlertMessage(content)
  setSeverity(type)
  handleClick()
}


  return (
    <>

    <main>
      {
        lodging 
        ? 
        <Card variant="outlined" sx={{ maxWidth: 800, margin: '0 auto', marginTop: 4 }}>
      <div className='breadcrumb-back-btn' onClick={onBackClicked}><ArrowBackIcon fontSize="large" /></div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            {/* Insérez ici votre composant ImageGallery */}
            <div className='flex-center'>
                <img src="/img/logement-img.jpg" alt="Aperçu de l'appartement" width={250}/>

                <div style={{height: "100px"}}></div>

                  {
                    lodging.isAvailable 
                    ? <Button variant="contained" color="success" endIcon={<SendIcon />} size="large" onClick={() => bookLodging(params.id)}>
                      Je Réserve !
                    </Button> 

                    : <Button variant="contained" color='error' endIcon={<DomainDisabledIcon />} size="large" onClick={() => showAlert("Ce logement n'est plus disponible.", "warning")}>
                    Non Disponible
                  </Button>
                  }
            </div>
  
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <CardContent>
              <Typography variant="h4" component="div" sx={{ marginBottom: 2 }}>
                {lodging.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Type de logement: T2
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Options: {lodging.options && OptionsToString(lodging.options)}
              </Typography>
              {/* Insérez ici votre composant Availability */}
              {/* Insérez ici votre composant LocationMap */}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
              a résidence étudiante LOGIFAC Corneille est située en plein centre-ville de Rouen, rue des minimes. A proximité du Lycée Corneille et de la bibliothèque des Capucins, pratique pour étudier !

A 10 min à pied des Musées de la céramique, et des Beaux-Arts, du square Charles Verdrel et d’un centre de fitness, à 5 min du Parc de l’Hôtel de Ville, du Musée d’Histoire Naturelle et le Musée national de l’éducation, vous aurez plein d’idées de sorties ! Vous pourrez également profiter des nombreux commerces, restaurants, bars et parcs tout proches. Le quartier est très calme et bien desservi par les bus et le métro.

La résidence dispose d’une salle commune avec babyfoot et table de ping-pong. Les studios sont meublés avec un coin cuisine équipé et certains sont adaptés pour la colocation. Consultez les dispos et déposez votre demande de logement directement en ligne !
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      :
      <></>

      }
      

      {
        isLoading 
        ?
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
        
        : <></>
      }


  );

        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
              {alertMessage}
            </Alert>
        </Snackbar>

    </main>

</>
  )
}


function refreshPage() {
  window.location.reload(false);
}