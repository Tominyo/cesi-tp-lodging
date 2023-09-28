import React, {useState, useEffect} from 'react'
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import { OptionsToString } from '../utils/Utils';

export default function LodgingScreen(props) {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [lodging, setLodging] = useState({});
  
  const navigate = useNavigate();
  const params = useParams();

  const onBackClicked = () => {
    navigate(-1)
  }

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
        console.log(result)
       setLodging(result)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
     
      }
    )

}, [])

const bookLodging = () => {
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
        console.log(result)
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

    <main>
      <div className='breadcrumb-back-btn' onClick={onBackClicked}><ArrowBackIcon fontSize="large" /></div>
      
      <Card variant="outlined" sx={{ maxWidth: 800, margin: '0 auto', marginTop: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            {/* Insérez ici votre composant ImageGallery */}
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

      <div className='center-x'>
        <Button variant="contained" endIcon={<SendIcon />} size="medium" onClick={bookLodging}>
          Je Réserve !
        </Button>
      </div>

  );

    </main>

</>
  )
}
