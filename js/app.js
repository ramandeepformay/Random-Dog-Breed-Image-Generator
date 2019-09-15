const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url){
    return fetch(url)
    .then(res=>res.json());
    
}

fetchData("https://dog.ceo/api/breeds/image/random")
.then(val=>imageGenerator(val.message));

fetchData("https://dog.ceo/api/breeds/list")
.then(val=>breedList(val.message));
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
//IMAGE GENERTOR FUNCTION
function imageGenerator(data){
    const html=`
    <img src="${data}">
    <p>Click to view more images ${select.value}</p>
    `;
    card.innerHTML=html;
}
//BREED LIST GENERATOR FUNCTION
function breedList(data){
    const dogOptions = data.map(dog=>`<option value=${dog}>${dog}</option>`);
    select.innerHTML=dogOptions;
}

function breedSelect(){
    const breeds= select.value;
    const img = card.querySelector('img');
    const p =card.querySelector('p');
    fetchData(`https://dog.ceo/api/breed/${breeds}/images/random`)
    .then(data=>{
        img.src=data.message
        p.textContent = `Click to view more images ${select.value}`
    })
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener("change",breedSelect);
card.addEventListener("click",breedSelect);


// ------------------------------------------
//  POST DATA
// ------------------------------------------

