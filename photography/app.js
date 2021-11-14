/*the api key, const, lets and other variables*/
const auth ="563492ad6f91700001000001c46daf612e914f1a980e15a014edc74d";
const nav = document.querySelector(".nav-links");
const burger =  document.querySelector(".burger");
const links = nav.querySelectorAll("a");
const photoActive = document.querySelector(".photography");
const gallery1  = document.querySelector(".gallery1");
const gallery2 = document.querySelector(".gallery2");
const morea = document.querySelector(".more1");
const moreb = document.querySelector(".more2");
let fetchLink1;
let fetchLink2;
let page1 = 1;
let page2 = 2;


//EVENT LISTENERS => for active on the page, and the "more" button
photoActive.onClick = photoActive.classList.add("present");
morea.addEventListener('click', loading1);
moreb.addEventListener('click', loading2);

//FUNCTIONALITY => burger, fetchApi, generatePictures 1 & 2,curatedPhotos, loading more 1&2
 
/*BURGER FUNCTIONALITY */
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

// we use the fetchAPi to get the data so we could generate the pictures
async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}
/*Creating the function that generates us the pictures for FIRST SECTION ,and data about the pictures:photographer name, adding classes to the pictures depending on their width and height: normal or large*/
function generatePictures1(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        if( photo.width > 3000 || photo.height < 2000 ){
            galleryImg.classList.add("large-card");
        }else if(photo.width < 3000 || photo.height> 2000){
            galleryImg.classList.add("normal-card");
        }
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <img src=${photo.src.large}></img>`;
        gallery1.appendChild(galleryImg);
    });
}
/*creating the function that generates the pictures for SECOND SECTION */
function generatePictures2(data) {
    data.photos.forEach(photo => {
        console.log(photo.width, photo.height);
        const galleryImg2 = document.createElement("div");
        if( photo.width > 3000 || photo.height < 2000){
            galleryImg2.classList.add("large-card");
        }else if(photo.width < 3000 || photo.height > 2000 ){
            galleryImg2.classList.add("normal-card");
        }
        galleryImg2.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <img src=${photo.src.large}></img>`;
        gallery2.appendChild(galleryImg2);
    });
}

/* in fetchLink we store the most recent pictures, in the first fetchLink the first 15 pictures, and on the second fetchLink the next first 15 pictures, then we use the fetchApi function and then we generate the pictures*/
async function curatedPhotos() {
    fetchLink1 = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data1 = await fetchApi(fetchLink1);
    fetchLink2 = "https://api.pexels.com/v1/curated?per_page=15&page=2";
    const data2 = await fetchApi(fetchLink2);
   generatePictures1(data1);
   generatePictures2(data2);
  }
/*The first "more" button, we increasing its page number with a value, and that means we will have 15 more pictures than on the previous, we call the fetchApi function and then we generate pictures */
async function loading1(){
 page1++;
 fetchLink1 = `https://api.pexels.com/v1/curated?per_page=15&page=${page1}`;
 const data1 = await fetchApi(fetchLink1);
 generatePictures1(data1);
}
//The second "more" button, we increasing its page number too with a value,we will have 15 more pictures than on the previous, we call the fetchApi function and then we generate the pictures
 async function loading2(){
    page2++;
    fetchLink2 = `https://api.pexels.com/v1/curated?per_page=15&page=${page2}`
    const data2 = await fetchApi(fetchLink2);
  generatePictures2(data2);
}
  //the curatedPhotos executes without needing an action from the user, its loading as soon as we enter on the page
curatedPhotos();




