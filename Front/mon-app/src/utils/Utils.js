export function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export const OptionsToString = (optionsList) => {

  if(optionsList.length > 0)
  {
    let optionsArray = []

    optionsList.forEach(element => {
      optionsArray.push(element.name)
    });

    
     return optionsArray.join()
  }

}
