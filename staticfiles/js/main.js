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

