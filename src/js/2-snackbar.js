import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = document.querySelector("#delay");

form.addEventListener("submit", makePromise);

function makePromise(event){
    event.preventDefault();
    const radioBtn = document.querySelector('input[name="state"]:checked').value;
    const delay = parseInt(input.value, 10);
    createPromise(radioBtn, delay)
    .then((message)=>{
        iziToast.success({
            title: 'Success!',
            message: message,
            position: 'center',
        });
    })
    .catch((message)=>{
        iziToast.error({
            title: 'Fail!',
            message: message,
            position: 'center',
        });
    })

}

function createPromise(radioBtn, delay){
    return new Promise((resolve, reject)=>{
    setTimeout(()=>{
    if(radioBtn === "fulfilled")
        resolve(`✅ Fulfilled promise in ${delay}ms`); 
    else{
        reject(`❌ Rejected promise in ${delay}ms`);
    }
    }, delay)
    })
}