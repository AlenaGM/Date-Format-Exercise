let date = new Date(); //время открытия/обновления страницы
console.log (date);

function formatDate(){
    let timePassed = (new Date() - date);//время, которое прошло с момента обновления страницы в мс

    if (timePassed/1000 < 1) {//переводим время, прошедшее с момента обновления страницы в секунды и сравниваем с 1 сек.
       console.log('прямо сейчас');//если прошло меньше 1 сек.
/*
    } else if (timePassed/1000 < 60){//переводим время, прошедшее с момента обновления страницы в секунды и сравниваем с 1 мин.
        console.log(`${Math.round(timePassed/1000)} сек. назад`);//если прошло меньше 1 мин.

    } else if (timePassed/1000 < 3600){//переводим время, прошедшее с момента обновления страницы в секунды и сравниваем с 1 часом
    console.log(`${Math.round(timePassed/60000)} мин. назад`);//если прошло меньше 1 часа.
*/
    } else {//показываем дату открытия/обновления страницы в формате ДД.ММ.ГГ, ЧЧ:ММ
        console.log(`страница обновлена ${new Intl.DateTimeFormat('ru-RU', {day:'2-digit', month:'2-digit', year:'2-digit'}).format(date)} в ${new Intl.DateTimeFormat('ru-RU', {hour:'2-digit', minute:'2-digit'}).format(date)}`);
    }
}

