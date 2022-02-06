let date;

function startMoving() {
    date = new Date(); //время открытия/обновления страницы
    let busImg = document.getElementById('cat-bus');
    busImg.src ="assets/img/totoro-cat-bus-moving.jpg";

    document.getElementById('travel-duration').innerHTML = '';
    document.getElementById('travel-info').innerHTML = '';

    let niceDate = new Date();//Мне больше нравится и понятен способ с Intl.DateTimeFormat как в 41-й строке. Здесь я вывелп в консоль дату просто, чтобы показать, что так я тоже умею.
        niceDate = [
        '0' + niceDate.getDate(),
        '0' + (niceDate.getMonth() + 1),
        '' + niceDate.getFullYear(),
        '0' + niceDate.getHours(),
        '0' + niceDate.getMinutes()].map(component => component.slice(-2));

    console.log (`Выехали ` + niceDate.slice(0,3).join('.') + ' в ' + niceDate.slice(3).join('.'));
}


function formatDate(){
    let timePassed = (new Date() - date);//время, которое прошло с момента обновления страницы в мс
    document.getElementById('travel-info').innerHTML = '';

    if (timePassed/1000 < 1) {//переводим время, прошедшее с момента обновления страницы в секунды и сравниваем с 1 сек.
        console.log('Вы выехали: прямо сейчас');//если прошло меньше 1 сек.
        document.getElementById('travel-duration').innerHTML = 'Вы выехали: прямо сейчас';

    } else if (timePassed/1000 < 60){//переводим время, прошедшее с момента обновления страницы в секунды и сравниваем с 1 мин.
        console.log(`Вы выехали: ${Math.round(timePassed/1000)} сек. назад`);//если прошло меньше 1 мин.
        document.getElementById('travel-duration').innerHTML = `Вы выехали: ${Math.round(timePassed/1000)} сек. назад`;

    } else if (timePassed/1000 < 3600){//переводим время, прошедшее с момента обновления страницы в секунды и сравниваем с 1 часом
        console.log(`Вы выехали: ${Math.round(timePassed/60000)} мин. назад`);//если прошло меньше 1 часа.
        document.getElementById('travel-duration').innerHTML = `Вы выехали: ${Math.round(timePassed/60000)} мин. назад`;

    } else {//показываем дату открытия/обновления страницы в формате ДД.ММ.ГГ, ЧЧ:ММ
        console.log(`Вы выехали: ${new Intl.DateTimeFormat('ru-RU', {day:'2-digit', month:'2-digit', year:'2-digit'}).format(date)} в ${new Intl.DateTimeFormat('ru-RU', {hour:'2-digit', minute:'2-digit'}).format(date)}`);
        document.getElementById('travel-duration').innerHTML = `Вы выехали: ${new Intl.DateTimeFormat('ru-RU', {day:'2-digit', month:'2-digit', year:'2-digit'}).format(date)} в ${new Intl.DateTimeFormat('ru-RU', {hour:'2-digit', minute:'2-digit'}).format(date)}`;
    }
}

function stopMoving() {
    let busImg = document.getElementById('cat-bus');
    busImg.src ="assets/img/totoro-cat-bus.jpg";
    document.getElementById('travel-info').innerHTML = `Путешествие началось ${new Intl.DateTimeFormat('ru-RU', {day:'2-digit', month:'2-digit', year:'2-digit'}).format(date)} в ${new Intl.DateTimeFormat('ru-RU', {hour:'2-digit', minute:'2-digit'}).format(date)}; <br>
    Путешествие закончилось ${new Intl.DateTimeFormat('ru-RU', {day:'2-digit', month:'2-digit', year:'2-digit'}).format(new Date)} в ${new Intl.DateTimeFormat('ru-RU', {hour:'2-digit', minute:'2-digit'}).format(new Date)};`
    document.getElementById('travel-duration').innerHTML = '';
}

