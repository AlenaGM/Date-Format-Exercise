let date;
let timer;

document.querySelector("#cat-bus").addEventListener("click", function startMoving() {

    date = new Date(); //время клика на картинку = начало движения
    let busImg = document.getElementById('cat-bus');
    busImg.src ="assets/img/totoro-cat-bus-moving.jpg";

    document.getElementById('travel-duration').innerHTML = '';
    document.getElementById('travel-info').innerHTML = '';

    if(document.getElementById('cat-bus').classList.contains("active")) {//если кот уже бежит => это повторный клик -> останавливаем
        document.getElementById('cat-bus').classList.remove("active");

        stopMoving();

    } else {
        document.getElementById('cat-bus').classList.add("active");
        //на будущее, чтобы знать: есть класс "active" -> кот бежит, нет -> стоит
    }
});

document.querySelector("#clickDate").addEventListener("click", function formatDate(){

    if (document.getElementById('cat-bus').classList.contains("active")){//исключаем возможность запустить таймер, если кот не бежит

        let timePassed = (new Date() - date);//время, которое прошло с момента начала движения в мс

        document.getElementById('travel-info').innerHTML = '';

        if (timePassed/1000 < 1) {//переводим время, прошедшее с момента начала движения в секунды и сравниваем с 1 сек.
            //если прошло меньше 1 сек.
            document.getElementById('travel-duration').innerHTML = 'Вы выехали: прямо сейчас';

        } else if (timePassed/1000 < 59){//переводим время, прошедшее с момента начала движения в секунды и сравниваем с 1 мин.
            //если прошло меньше 1 мин.
            document.getElementById('travel-duration').innerHTML = `Вы выехали: ${Math.round(timePassed/1000)} сек. назад`;

        } else if (timePassed/1000 < 3599){//переводим время, прошедшее с момента начала движения в секунды и сравниваем с 1 часом
            //если прошло меньше 1 часа.
            document.getElementById('travel-duration').innerHTML = `Вы выехали: ${Math.round(timePassed/60000)} мин. назад`;

        } else {//если прошло больше часа, показываем дату начала движения в формате ДД.ММ.ГГ, ЧЧ:ММ
            document.getElementById('travel-duration').innerHTML =
            `Вы выехали: ${new Intl.DateTimeFormat('ru-RU', {day:'2-digit', month:'2-digit', year:'2-digit'}).format(date)}
            в ${new Intl.DateTimeFormat('ru-RU', {hour:'2-digit', minute:'2-digit'}).format(date)}`;
        }

        timer = setTimeout(formatDate,1000);//Чтобы таймер крутился без остановки

    } else {//случай, когда кот еще/уже не бежит: таймер не крутится, время в пути отсутствует
        document.getElementById('travel-duration').innerHTML = `Не знаю: сейчас вы не путешествуете.<br> Может, поедем уже?`;
        document.getElementById('travel-info').innerHTML = '';
    }
});

document.querySelector("#arrDest").addEventListener("click", function(){
    stopMoving();
});

document.querySelector("#resetTimer").addEventListener('click', function(){
    location.reload()
});

function stopMoving() {

    let busImg = document.getElementById('cat-bus');
    busImg.src ="assets/img/totoro-cat-bus.jpg";

    document.getElementById('travel-duration').innerHTML = '';
    document.getElementById('travel-info').innerHTML =
    `Путешествие началось ${new Intl.DateTimeFormat('ru-RU', {day:'2-digit', month:'2-digit', year:'2-digit'}).format(date)}
    в ${new Intl.DateTimeFormat('ru-RU', {hour:'2-digit', minute:'2-digit'}).format(date)}; <br>
    Путешествие закончилось ${new Intl.DateTimeFormat('ru-RU', {day:'2-digit', month:'2-digit', year:'2-digit'}).format(new Date)}
    в ${new Intl.DateTimeFormat('ru-RU', {hour:'2-digit', minute:'2-digit'}).format(new Date)};`

    document.getElementById('cat-bus').classList.remove("active");

    clearTimeout(timer);//Останавливаем таймер
};