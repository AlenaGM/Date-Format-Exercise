let date;
let timer;

document
  .querySelector("#cat-bus")
  .addEventListener("click", function startMoving() {
    date = new Date(); //time of click on the image => travel begins
    let busImg = document.getElementById("cat-bus");
    busImg.src = "assets/img/totoro-cat-bus-moving.jpg"; //img changes from static to moving

    document.getElementById("travel-duration").innerHTML = "";
    document.getElementById("travel-info").innerHTML = "";

    if (document.getElementById("cat-bus").classList.contains("active")) {
      //if the cat is already running = it's a second click => we stop the cat

      stopMoving(); //we stop the cat, we remove class "active"
      document.getElementById("cat-bus").classList.remove("active");
    } else {
      document.getElementById("cat-bus").classList.add("active");
      //for future use, if "active" -> the cat is running, if "no" -> the cat is not running
    }
  });

document
  .querySelector("#clickDate")
  .addEventListener("click", function formatDate() {
    if (document.getElementById("cat-bus").classList.contains("active")) {
      //we exclude possibility to start timer, if the cat is not running

      let timePassed = new Date() - date; //time from travel start until now, in msec

      document.getElementById("travel-info").innerHTML = "";

      if (timePassed / 1000 < 1) {
        //time from travel-start until now is converted in seconds and compared to 1 sec
        //if it is less than 1 sec:
        document.getElementById("travel-duration").innerHTML =
          "Вы выехали: прямо сейчас";
      } else if (timePassed / 1000 < 59) {
        //time from travel-start until now is converted in seconds and compared to 1 minute
        //if it is less than 1 minute:
        document.getElementById(
          "travel-duration"
        ).innerHTML = `Вы выехали: ${Math.round(timePassed / 1000)} сек. назад`;
      } else if (timePassed / 1000 < 3599) {
        //time from travel-start until now is converted in seconds and compared to 1 hour
        //if it is less than 1 hour:
        document.getElementById(
          "travel-duration"
        ).innerHTML = `Вы выехали: ${Math.round(
          timePassed / 60000
        )} мин. назад`;
      } else {
        //if it is more than 1 hour, we show full date in `DD.MM.YY HH:mm` format.
        document.getElementById(
          "travel-duration"
        ).innerHTML = `Вы выехали: ${new Intl.DateTimeFormat("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(date)}
            в ${new Intl.DateTimeFormat("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(date)}`;
      }

      timer = setTimeout(formatDate, 1000); //we make timer turn nonstop
    } else {
      //case when cat is not running or stopped running => timer is not turning and there is no travel time to show
      document.getElementById(
        "travel-duration"
      ).innerHTML = `Не знаю: сейчас вы не путешествуете.<br> Может, поедем уже?`;
      document.getElementById("travel-info").innerHTML = "";
    }
  });

document.querySelector("#arrDest").addEventListener("click", function () {
  //we press the button and stop the cat
  stopMoving();
});

document.querySelector("#resetTimer").addEventListener("click", function () {
  location.reload();
});

function stopMoving() {
  if (document.getElementById("cat-bus").classList.contains("active")) {
    //Results reporting (only if the cat had been running and arrived)

    let busImg = document.getElementById("cat-bus");
    busImg.src = "assets/img/totoro-cat-bus.jpg"; //img changes from moving to static

    document.getElementById("travel-duration").innerHTML = ""; //Showing result
    document.getElementById(
      "travel-info"
    ).innerHTML = `Путешествие началось ${new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date)}
        в ${new Intl.DateTimeFormat("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(date)}; <br>
        Путешествие закончилось ${new Intl.DateTimeFormat("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date())}
        в ${new Intl.DateTimeFormat("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date())};`;

    document.getElementById("cat-bus").classList.remove("active");

    clearTimeout(timer); //We stop the timer
  } else {
    //case when the cat has not run = no results to show
    document.getElementById("travel-duration").innerHTML = ``;
    document.getElementById(
      "travel-info"
    ).innerHTML = `Вы никуда не приехали,<br> потому что ниоткуда не выезжали`;
  }
}
