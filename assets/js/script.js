let date;
let timer;

document
  .querySelector("#cat-bus")
  .addEventListener("click", function startMoving() {
    date = new Date(); //time of image-click => travel begins
    let busImg = document.getElementById("cat-bus");
    busImg.src = "assets/img/totoro-cat-bus-moving.jpg"; //img changes from static to moving

    document.getElementById("travel-duration").innerHTML = "";
    document.getElementById("travel-info").innerHTML = "";

    document.getElementById("title").classList.add("hidden");

    if (document.getElementById("cat-bus").classList.contains("active")) {
      //if the cat is already running = it's a second click => we stop the cat

      stopMoving(); //we stop the cat, we remove class "active"
      document.getElementById("cat-bus").classList.remove("active");
      document.getElementById("title").classList.remove("hidden");
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
          "You departed: right now";
      } else if (timePassed / 1000 < 59) {
        //time from travel-start until now is converted in seconds and compared to 1 minute
        //if it is less than 1 minute:
        document.getElementById(
          "travel-duration"
        ).innerHTML = `You departed: ${Math.round(
          timePassed / 1000
        )} seconds ago`;
      } else if (timePassed / 1000 < 3599) {
        //time from travel-start until now is converted in seconds and compared to 1 hour
        //if it is less than 1 hour:
        document.getElementById(
          "travel-duration"
        ).innerHTML = `You have departed: ${Math.round(
          timePassed / 60000
        )} min ago`;
      } else {
        //if it is more than 1 hour, we show full date in `DD.MM.YY HH:mm` format.
        document.getElementById(
          "travel-duration"
        ).innerHTML = `You departed at ${new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(date)}
            on ${new Intl.DateTimeFormat("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            }).format(date)}`;
      }

      timer = setTimeout(formatDate, 1000); //we make timer run nonstop
    } else {
      //case when the cat is not running or stopped running => timer is not running and there is no travel time to show
      document.getElementById(
        "travel-duration"
      ).innerHTML = `No idea: your are not travelling.<br> Let's get started!!`;
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
    ).innerHTML = `Your travel started ${new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date)}
        at ${new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(date)}; <br>
        Your travel ended ${new Intl.DateTimeFormat("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date())}
        at ${new Intl.DateTimeFormat("fr-FR", {
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
    ).innerHTML = `You have not arrived anywhere,<br> because you haven't departured!`;
  }
}
