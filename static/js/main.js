function myFunction(){
  let more_description = document.getElementById("more-description");
  let less_description = document.getElementById("less-description");

  if (more_description.style.display === "none"){
    more_description.style.display = "block";
    less_description.style.display = "none";
  }else{
    more_description.style.display = "none";
    less_description.style.display = "block";
  }
}


function myFunction(id) {
  let more_description = document.getElementById("more-description" + id);
  let less_description = document.getElementById("less-description" + id);

  let more_btn = document.getElementById("more_btn" + id);
  let less_btn = document.getElementById("less_btn" + id);

  if (more_description.style.display === "none") {
    more_description.style.display = "block";
    less_description.style.display = "none";
    less_btn.style.display = "block"
    more_btn.style.display = "none"

  } else {
    more_description.style.display = "none";
    less_description.style.display = "block";
    less_btn.style.display = "none"
    more_btn.style.display = "block"
  }
}

function skillsFunction(id) {
  let more_skill_description = document.getElementById("more" + id)
  let less_skill_description = document.getElementById("less" + id)

  let read_more_btn = document.getElementById("read_more_skill" + id)
  let read_less_btn = document.getElementById("read_less_skill" + id)

  if (more_skill_description.style.display == "none") {
    more_skill_description.style.display = "block";
    less_skill_description.style.display = "none";
    read_more_btn.style.display = "none";
    read_less_btn.style.display = "block";

  } else {
    more_skill_description.style.display = "none";
    less_skill_description.style.display = "block";
    read_less_btn.style.display = "none"
    read_more_btn.style.display = "block"
  }

}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})




// ************************************* Typwriter effect *****************


var dataText = ["fullstack developer", "UI/UX Designer"];

function typeWriter(text, i, fnCallback) {
  if (i < (text.length)) {
    document.getElementById("animation").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
    setTimeout(function () {
      typeWriter(text, i + 1, fnCallback)
    }, 100);
  } else if (typeof fnCallback == 'function') {
    setTimeout(fnCallback, 700);
  }
}

function StartTextAnimation(i) {

  if (dataText[i] == undefined) {
    StartTextAnimation(0);
  }

  if (i < dataText.length ) {

    typeWriter(dataText[i], 0, function () {
      StartTextAnimation(i + 1);
    });
  }
}

StartTextAnimation(0);

// *********************************** Delay Navigation *********************



