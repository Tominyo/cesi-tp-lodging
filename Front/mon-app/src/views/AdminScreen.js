import React from 'react'

export default function () {
  return (
    <div>
            <ul class="menu">

                <b class="b">ADMIN</b>
                <i class="i">Space</i>

                <div class="text">
                    <li class="item"><a ><i class="fas fa-home"></i>Home</a></li>
                    <li class="item"><a><i class="fas fa-chart-line"></i>Activités</a></li>
                    <li class="item"><a>

                <i class="fas fa-bell"></i>Notification</a></li>
                </div>
                </ul>

                <h1 style={{textTransform: "uppercase"}} class="h">Welcome admin 👋</h1>


        <div class="container">



        <fieldset class="info">

            Statistique
            
            <p>
                
                23 visiteurs soit 3 de plus qu'hier dont 1 nouveau visiteur
            </p>

            <div class="logo">
                <i class="fas fa-chart-line"></i>
            </div>
        </fieldset>

        <fieldset class="info">

            Visiteurs
            
            <p>
                

                25 visiteurs en ce moment.

            </p>

            <div class="logo">
                <i class="fas fa-user"></i>
            </div>
        </fieldset>

        <fieldset class="info">

            Notification
            
            <p>
                
            <table>
                <tr>
                    <td>
                        Aucune notification pour le moment
                    </td>
                </tr>
            </table>
            </p>

            <div class="logo">
                <i class="fas fa-bell"></i>
            </div>
        </fieldset>



        <fieldset class="info">

            Ajouter des articles
            
            <p>
                
                Vous pouvez ajouter ou modifier des articles et même personnaliser vos pages.
                
                <button style={{marginTop: "1rem"}}>Cliquez ici pour ajouter des articles</button>

            </p>

            <div class="logo">
                <i class="fas fa-edit"></i>
            </div>
        </fieldset>



        <fieldset class="info">

            Visiteurs
            
            <p>
                
                Dernière connexion il y a 3 heures à Paris.
                
                <button style={{marginTop: "1rem"}}>Voir l'historique de connexion</button>

            </p>

            <div class="logo">
                <i class="fas fa-shield-alt"></i>
            </div>
        </fieldset>


        <div class="coordonate">
            <h2><i class="fas fa-id-card" style={{marginRight: "10px"}}></i> Contactez moi</h2>
            <p>
                Contactez moi e ncas de bug je le corrigerais. Vous pouvez aussi me contacter pour ajouter des options
                facturés. 
                <a href="#">Me contacter </a>
            </p>
            
            <p>
                <i class="fas fa-phone-square-alt"></i>
                <i class="fab fa-twitter-square"></i>
                <i class="fas fa-envelope"></i>
            </p>
        </div>

    </div>
</div>
  )
}
