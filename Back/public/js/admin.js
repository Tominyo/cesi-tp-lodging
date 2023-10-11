//const users = [{id: 1, nom: "Jean", prenom: "Pierre", age:  25}]

var lodgings = []
const validateButton = document.getElementById("validate")
const homeSectionButton = document.getElementById("home-section-btn")
const lodgingSectionButton = document.getElementById("lodging-section-btn")
const userSectionButton = document.getElementById("user-section-btn")
const reservationSectionButton = document.getElementById("reservation-section-btn")

const homeSection = document.getElementById("home-section")
const lodgingSection = document.getElementById("lodging-section")
const userSection = document.getElementById("user-section")
const reservationSection = document.getElementById("reservation-section")

const modalClose = document.getElementById('modal-close')
const modal = document.getElementById('modal')
const modalTitle = document.getElementById("modal-title")
const modalContent = document.getElementById("modal-content")

validateButton.addEventListener("click", addLodging);
homeSectionButton.addEventListener("click", switchTab);
lodgingSectionButton.addEventListener("click", switchTab);
userSectionButton.addEventListener("click", switchTab);
reservationSectionButton.addEventListener("click", switchTab)

homeSectionButton.index = 0
lodgingSectionButton.index = 1
userSectionButton.index = 2
reservationSectionButton.index = 3

modalClose.addEventListener('click', function(e) {
    modal.style.display = 'none'
  })

let modalAlreadyShowed = false

//lodgingSectionButton.addEventListener("click", () => switchTab(1))
//userSectionButton.addEventListener("click", () => switchTab(2))

//switchTab(0);
showAllLodgings();
showAllUsers();
showAllReservations();

function showModal(title, content, auto) {
    if( ! modalAlreadyShowed ) {
        
        //document.getElementById("modal-title").innerHTML = "SALUT"
        modalTitle.innerHTML = title
        modalContent.innerHTML = content

        setTimeout( () => {
            modal.style.display = 'block'
            modalAlreadyShowed = false

            
            setTimeout( () => {
                if(auto)
                {
                    modal.style.display = 'none'
                }
            }, 3000 )
 
        }, 1000 )
       
        modalAlreadyShowed = true
        }
}

function updateOrDeleteLodging() {
    const deleteButtons = document.querySelectorAll(".Supprimer")
    const editButtons = document.querySelectorAll(".Modifier")

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => deleteLodging(button.id));
    })
    editButtons.forEach((button) => {
        button.addEventListener("click", () => editLodging(button.id));
    })
}


function switchTab(e) {
    e.preventDefault()

    getLodgingNameById(1)

    let index = e.currentTarget.index;

    switch(index) {
        case 0:
            homeSection.classList.remove("hidden")
            
            lodgingSection.classList.add("hidden")
            userSection.classList.add("hidden")
            reservationSection.classList.add("hidden")
            break;

        case 1:
            homeSection.classList.add("hidden")
            
            lodgingSection.classList.remove("hidden")
            userSection.classList.add("hidden")
            reservationSection.classList.add("hidden")
            break;

        case 2:
        homeSection.classList.add("hidden")

        lodgingSection.classList.add("hidden")
        userSection.classList.remove("hidden")
        reservationSection.classList.add("hidden")
        break;

        case 3:

        homeSection.classList.add("hidden")
    
        lodgingSection.classList.add("hidden")
        userSection.classList.add("hidden")
        reservationSection.classList.remove("hidden")
        break;
    }
}

/*
function switchHomeTab(e) {
    e.preventDefault()

    const homeSection = document.getElementById("home-section")
    const lodgingSection = document.getElementById("lodging-section")

    //homeSection.classList.add("selected-tab")
    homeSection.classList.remove("hidden")
    
    //lodgingSection.classList.remove("selected-tab")
    lodgingSection.classList.add("hidden")


}

function switchLodgingTab(e) {
    e.preventDefault()

    console.log("SKRRRRRR")
    //showModal("Erreur", "Echec lors de la modification du logement", true)
    const homeSection = document.getElementById("home-section")
    const lodgingSection = document.getElementById("lodging-section")

    //homeSection.classList.remove("selected-tab")
    homeSection.classList.add("hidden")
    
    //lodgingSection.classList.add("selected-tab")
    lodgingSection.classList.remove("hidden")
}

function switchLodgingTab(e) {
    e.preventDefault()

    console.log("SKRRRRRR")
    //showModal("Erreur", "Echec lors de la modification du logement", true)
    const homeSection = document.getElementById("home-section")
    const lodgingSection = document.getElementById("lodging-section")

    //homeSection.classList.remove("selected-tab")
    homeSection.classList.add("hidden")
    
    //lodgingSection.classList.add("selected-tab")
    lodgingSection.classList.remove("hidden")
}

function switchLodgingTab(e) {
    e.preventDefault()

    console.log("SKRRRRRR")
    //showModal("Erreur", "Echec lors de la modification du logement", true)
    const homeSection = document.getElementById("home-section")
    const lodgingSection = document.getElementById("lodging-section")

    //homeSection.classList.remove("selected-tab")
    homeSection.classList.add("hidden")
    
    //lodgingSection.classList.add("selected-tab")
    lodgingSection.classList.remove("hidden")
}
*/

function addLodging(e) {
    e.preventDefault()

    const enteredLodgingsData = {
        //id: lodgings.length !== 0 ? lodgings[lodgings.length-1].id + 1 : 1,
        nom: document.getElementById("nom").value,
    }

    const selectedColor = document.querySelector('input[name="drone"]:checked').value;
    var selectedOptions = []
    //var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    const tvCheckbox = document.getElementById("tv-opt")
    const internetCheckbox = document.getElementById("internet-opt")

    if(tvCheckbox.checked)
    {
        selectedOptions.push({id: "tv"})
    }

    if(internetCheckbox.checked)
    {
        selectedOptions.push({id: "internet"})
    }

    if(enteredLodgingsData.nom  !== "") {
        // On ajoute le nouvel élement à la liste
        //lodgings.push(enteredLodgingsData)
        //console.log(lodgings)

        let mapData = {
            name: enteredLodgingsData.nom,
            colorId: selectedColor,
            options: selectedOptions
        }

        console.log(mapData)

        postData("api/logements/", mapData).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            showAllLodgings()
            showModal("Nouveau logement", `Le logement ${mapData.name} a été ajouté avec succès !`, false)
        });
    }
}

function showAllLodgings() {
        // url (required), options (optional)
    fetch('api/logements/', {
        method: 'get'
    }).then(async (response) => {

        // On retrouve les logements
       lodgings = await response.json()

       console.log(lodgings)

       lodgings.forEach(element => {
        console.log(element)
       });

       document.getElementById("allLodgings").innerHTML = "";
       lodgings.forEach(lodging => {
           const newInputs = {
               Nom: document.createElement("input"),
           }
   
           const newDiv = document.createElement("div")

           const newColors = {
            Huey: document.createElement("input"),
            Dewey: document.createElement("input"),
            Salmon: document.createElement("input")
           }

           const newOptions = {
            TV: document.createElement("input"),
            Internet: document.createElement("input"),
            }

            const newAvailability = {
                IsAvailable: document.createElement("input")
            }
   
           const newButtons = {
               Supprimer: document.createElement("input"),
               Modifier: document.createElement("input")
           }

           newDiv.classList.add("list-item")
   
           for(const [key, value] of Object.entries(newInputs))
           {
               value.setAttribute("type", "text");
               value.setAttribute("id", `${key}OfLodging-${lodging.id}`)
   
               key === "Nom" && value.setAttribute("value", lodging.name)
               key === "Couleur" && value.setAttribute("value", lodging.color.name)
               key === "Options" && value.setAttribute("value", lodging.options)
   
               newDiv.appendChild(value)
               document.getElementById("allLodgings").appendChild(newDiv);
           }

           const newDivContainer = document.createElement("div")
           newDivContainer.classList.add("flex-col")

           for(const [key, value] of Object.entries(newColors))
           {

            const newDivContainerSub = document.createElement("div")


            // D'abord le label
               const label = document.createElement("label");
               const newDivColor = document.createElement("div") 

               if(key === "Huey")
               {
                label.setAttribute("for","huey");
                label.textContent = "Huey"

                value.setAttribute("id", "huey");
                value.setAttribute("type", "radio");
                value.setAttribute("value", "huey");

                // Si la couleur est la même on assigne le checked
                if(lodging.colorId === "huey")
                    value.checked = true;
                
                newDivColor.classList.add("radio-btn");
                newDivColor.classList.add("huey");
                
               } 

               if(key === "Dewey")
               {
                label.setAttribute("for","dewey");
                label.textContent = "Dewey"

                value.setAttribute("id", "dewey");
                value.setAttribute("type", "radio");
                value.setAttribute("value", "dewey");

                if(lodging.colorId === "dewey")
                    value.checked = true;
                
                newDivColor.classList.add("radio-btn");
                newDivColor.classList.add("dewey");
               }

               if(key === "Salmon")
               {
                label.setAttribute("for","salmon");
                label.textContent = "Salmon"

                value.setAttribute("id", "salmon");
                value.setAttribute("type", "radio");
                value.setAttribute("value", "salmon");

                if(lodging.colorId === "salmon")
                    value.checked = true;
                
                newDivColor.classList.add("radio-btn");
                newDivColor.classList.add("salmon");
               }

               value.setAttribute("name", `radiogroup-${lodging.id}`);
   
                newDivContainerSub.appendChild(newDivColor)
                newDivContainerSub.appendChild(value)
                
                //le nom des couleurs
                //newDivContainer.appendChild(label)

               newDivContainer.appendChild(newDivContainerSub)

           }

           newDiv.appendChild(newDivContainer)
           document.getElementById("allLodgings").appendChild(newDiv);

           for(const [key, value] of Object.entries(newOptions))
           {
            const newDivPreferences = document.createElement("div")

            // D'abord le label
               const label = document.createElement("label");
               if(key === "TV")
               {
                label.setAttribute("for","tv");
                label.textContent = "TV"
               } 
               if(key === "Internet")
               {
                label.setAttribute("for","internet");
                label.textContent = "Internet"
               }

            // Ensuite on crée sa checkbox
               value.setAttribute("type", "checkbox");
               value.setAttribute("id", `Checkbox${key}OfLodging-${lodging.id}`)
            
               console.log("HELOOOOOOOo")
               console.log(lodging.options)
                   
               if(lodging.options.length > 0)
               {
                lodging.options.forEach(option => {

                    if(key === "TV")
                    {
                        console.log("option.id:" + option.id)
                        if(option.id === "tv")
                        value.checked = true;
                    }

                    if(key === "Internet")
                    {
                        console.log("option.id:" + option.id)
                        if(option.id === "internet")
                        value.checked = true;
                    }

                });
          
               }

                newDivPreferences.appendChild(label)
                newDivPreferences.appendChild(value)

               newDiv.appendChild(newDivPreferences)
               document.getElementById("allLodgings").appendChild(newDiv);
           }

           for(const [key, value] of Object.entries(newAvailability))
           {
            const newDivAvailability = document.createElement("div")

            // D'abord le label
               const label = document.createElement("label");
               //label.setAttribute("for","availability");
               label.classList.add("switch")
               //label.textContent = "Disponible"

            // Ensuite on crée sa checkbox
               value.setAttribute("type", "checkbox");
               value.setAttribute("id", `Checkbox${key}OfLodging-${lodging.id}`)

               const span = document.createElement("span")
               span.classList.add("slider")
               span.classList.add("round")

               //on regarde l"état de la checkbox
               value.checked = lodging.isAvailable;

                label.appendChild(value)
                label.appendChild(span)
    
                //newDivPreferences.appendChild(label)
                //newDivPreferences.appendChild(value)

                const spanTitle = document.createElement("span")
                spanTitle.innerHTML = "Disponibilité"

                newDivAvailability.appendChild(spanTitle)
                newDivAvailability.appendChild(label)

               newDiv.appendChild(newDivAvailability)
               
           }

              
           for(const [key, value] of Object.entries(newButtons))
           {
               value.setAttribute("type", "button");
               value.setAttribute("class", key);
               value.setAttribute("id", `Button${key}Of-${lodging.id}`);
               value.setAttribute("value", key);
   
               newDiv.appendChild(value)
           }

           document.getElementById("allLodgings").appendChild(newDiv);
   
           updateOrDeleteLodging();
       })

    })
   .catch(function(err) {
        // Error :(
        console.log(err)
    });

}

function showAllUsers() {
    // url (required), options (optional)
fetch('api/users/', {
    method: 'get'
}).then(async (response) => {

    // On retrouve les logements
   users = await response.json()

   console.log(users)

   users.forEach(element => {
    console.log(element)
   });

   document.getElementById("allUsers").innerHTML = "";
   users.forEach(user => {

        const newDiv = document.createElement("div")

       const newInputs = {
           id: document.createElement("input"),
           username: document.createElement("input"),
           email: document.createElement("input"),
           isAdmin: document.createElement("input")
       }

       const newButtons = {
        Supprimer: document.createElement("input"),
        Modifier: document.createElement("input")
    }

       newDiv.classList.add("list-item")

       for(const [key, value] of Object.entries(newInputs))
       {
           value.setAttribute("type", "text");
           value.setAttribute("id", `${key}OfUser-${user.id}`)

           key === "id" && value.setAttribute("value", user.id)
           key === "username" && value.setAttribute("value", user.username)
           key === "email" && value.setAttribute("value", user.email)
           key === "isAdmin" && value.setAttribute("value", user.isAdmin)

           newDiv.appendChild(value)
       }

          
       for(const [key, value] of Object.entries(newButtons))
       {
           value.setAttribute("type", "button");
           value.setAttribute("class", key);
           value.setAttribute("id", `Button${key}Of-${user.id}`);
           value.setAttribute("value", key);

           //newDiv.appendChild(value)
       }

       document.getElementById("allUsers").appendChild(newDiv);

       //updateOrDeleteLodging();
   })

})
.catch(function(err) {
    // Error :(
    console.log(err)
});

}

function showAllReservations() {
    // url (required), options (optional)
fetch('api/reservations/', {
    method: 'get'
}).then(async (response) => {

    // On retrouve les logements
   reservations = await response.json()

   console.log(reservations)

   reservations.forEach(element => {
    console.log(element)
   });

   document.getElementById("allReservations").innerHTML = "";
   reservations.forEach(async reservation => {

        const newDiv = document.createElement("div")

        const newInputs = {
           id: document.createElement("input"),
           checkInDate: document.createElement("input"),
           checkOutDate: document.createElement("input"),
           userId: document.createElement("input"),
           lodgingId: document.createElement("input")
       }

       const newButtons = {
        Supprimer: document.createElement("input"),
        Modifier: document.createElement("input")
    }

       newDiv.classList.add("list-item")

       for(const [key, value] of Object.entries(newInputs))
       {
           value.setAttribute("type", "text");
           value.setAttribute("id", `${key}OfReservation-${reservation.id}`)

           key === "id" && value.setAttribute("value", reservation.id)
           key === "checkInDate" && value.setAttribute("value", reservation.checkInDate)
           key === "checkOutDate" && value.setAttribute("value", reservation.checkOutDate)
           key === "userId" && value.setAttribute("value", reservation.userId)
           key === "lodgingId" && value.setAttribute("value", reservation.lodgingId)
           //key === "lodgingId" && value.setAttribute("value", await getLodgingNameById(reservation.lodgingId))

           newDiv.appendChild(value)

       }

          
       for(const [key, value] of Object.entries(newButtons))
       {
           value.setAttribute("type", "button");
           value.setAttribute("class", key);
           value.setAttribute("id", `Button${key}Of-${reservation.id}`);
           value.setAttribute("value", key);

           //newDiv.appendChild(value)
       }

       document.getElementById("allReservations").appendChild(newDiv);

       //updateOrDeleteLodging();
   })

})
.catch(function(err) {
    // Error :(
    console.log(err)
});

}


function deleteLodging(id) {
    console.log("Delete Lodging")
    //const buttonId = id.charAt(id.length - 1)
    const buttonId = id.split('-')[1]

    lodgings.forEach((lodging) => {
        //const userPositionInArray = lodgings.indexOf(lodging);    
        //lodging.id === parseInt(id) && lodgings.splice(userPositionInArray, 1);
        console.log("SKRRRRTss")
        console.log(lodging.id)
        console.log(id.charAt(id.length - 1))
        if(lodging.id === parseInt(buttonId))
        {
            console.log("REUSSI")
            deleteData(`api/logements/${buttonId}`).then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
                showAllLodgings()
                showModal("Suppression de logement", `Le logement ${lodging.name} a correctement été supprimé ! `, false)
            });

        }

    })

}

function editLodging(id) {

    //const buttonId = id.charAt(id.length - 1)
    const buttonId = id.split('-')[1]

    console.log("Edit Lodging")
    console.log(`NomOfLodging-${buttonId}`)

    const newInputs = {
        nom: document.getElementById(`NomOfLodging-${buttonId}`).value,
                                      
        //color: document.getElementById(`CouleurOfLodging${buttonId}`).value,
        //options: document.getElementById(`optionsOfLodging${id}`).value
    }

    const newColorInput = document.querySelector(`input[name=radiogroup-${buttonId}]:checked`)

    //const newOptions = document.querySelectorAll(`input[type=checkbox]`)
    const tvOption = document.getElementById(`CheckboxTVOfLodging-${buttonId}`).checked
    const internetOption = document.getElementById(`CheckboxInternetOfLodging-${buttonId}`).checked
    let listOptions = []

    if(tvOption)
    {
        listOptions.push({"id": "tv"})
    }

    if(internetOption)
    {
        listOptions.push({"id": "internet"})
    }

    const options = {
        "TV": tvOption,
        "Internet": internetOption
    }

    const isAvailable = document.getElementById(`CheckboxIsAvailableOfLodging-${buttonId}`).checked

    //console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSs")
    console.log(listOptions)
    console.log(newColorInput.value) 
    lodgings.forEach((lodging) => {

        if(lodging.id === parseInt(buttonId))
        {
            //lodging.nom = newInputs.nom;
            //lodging.color = newInputs.color;
            //lodging.options = newInputs.options;

            putData(`api/logements/${buttonId}`, { name: newInputs.nom, colorId: newColorInput.value, options: listOptions, isAvailable: isAvailable }).then((data) => {
                console.log("ACT77777")
                console.log(options)
                console.log(data); // JSON data parsed by `data.json()` call

                // On Actualise dans le then()
                showAllLodgings();

                showModal("Modification de logement", `Le logement ${lodging.name} a été modifié avec succès !`, false)
            });
        }
    })

    //showAllLodgings();
}

// Example POST method implementation:
async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  // Example PUT method implementation:
async function putData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function getData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:3000",
        "Access-Control-Allow-Credentials" : true,
        "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers" : "Origin, Content-Type, Accept"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

    // Example PUT method implementation:
async function deleteData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


async function getLodgingNameById(lodgingId) {
    let url = `http://localhost:3001/api/logements/${lodgingId}`
    getData(url).then((data) => {
        console.log("gouzigouza")
        console.log(data.name)
        return data.name
    })
}