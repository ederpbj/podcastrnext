export function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / 3600); //floor arredonda para baixo
  const minutes = Math.floor((duration % 3600) / 60); //pega o resto da divisão
  const seconds = duration % 60; //pega o resto da divisão

  //percorre e adiociona 0 antes se não tiver número
  const timeString = [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, '0')) //dois digitos sempre 00:00:00
    .join(':');

    return timeString;
}





// const = hours = duration / (60 * 60 ) 
/* export function convertDurationToTimeString(duration: number): string {
//Força para string
} */

