const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url,config=null){
    return fetch(url,config)
    .then(res=>res.json())
    .catch(error=>console.log(error))
    
}


fetchData("https://dog.ceo/api/breeds/image/random")
.then(val=>imageGenerator(val.message));

fetchData("https://dog.ceo/api/breeds/list")
.then(val=>breedList(val.message));
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
//converting first letter to uppercase
function upper(data){
    return data.charAt(0).toUpperCase() + data.slice(1);
}
//IMAGE GENERTOR FUNCTION
function imageGenerator(data){
    const html=`
    <img src="${data}">
    <p>Click to view more images ${upper(select.value)}</p>
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
        p.textContent = `Click to view more images ${upper(select.value)}`
    })
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener("change",breedSelect);
card.addEventListener("click",breedSelect);
form.addEventListener("submit", postData);

// ------------------------------------------
//  POST DATA
// ------------------------------------------
function postData(e){
    e.preventDefault();
    console.log("yes")
    const user = document.getElementById("name").value;
    const msg= document.getElementById("comment").value;
    const config={
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({name:user,message:msg})
    };
    fetchData("https://jsonplaceholder.typicode.com/comments",config)
    .then(data=>console.log(data))
}
