/* the page where are on has it's link color green, as in where are present on that page */
const newsActive = document.querySelector(".news");
const nav = document.querySelector(".nav-links");
const burger =  document.querySelector(".burger");
const links = nav.querySelectorAll("a");


newsActive.onClick = newsActive.classList.add("present");

burger.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    burger.classList.toggle("toggle");
  });
  
  links.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
      burger.classList.toggle("toggle");
    });
  });