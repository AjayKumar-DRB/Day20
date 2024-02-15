//fetching a API from other website for abbrevation of currencies
fetch('https://api.frankfurter.app/currencies')
//converting API to json format
.then(res=>res.json())
.then(res=>displayDropDown(res))

let select=document.querySelectorAll('.currency')
let btn=document.getElementById('btn')
let input=document.getElementById('input')
let result=document.getElementById('result')
let alertBox=document.getElementById('alert')

function displayDropDown(res){
    //Object.entries -> this used to convert json to array
    const curr=Object.entries(res)
    curr.forEach(element => {
        let opt=`<option value="${element[0]}">${element[0]} (${element[1]})</option>`
        select[0].innerHTML+=opt
        select[1].innerHTML+=opt
    });


}

input.addEventListener('keyup', con); // Event listener for keyup event in input field

// Update currency conversion result
function con() {
    let curr1 = select[0].value;
    let curr2 = select[1].value;
    let value = input.value;
    convert(curr1, curr2, value);
}

// Convert currencies
function convert(curr1, curr2, value) {
    if (value === '') {
        result.value = ''; // Clear result if input is empty
        alertBox.textContent = ''; // Clear any previous alerts
        return; // Exit function if input is empty
    }    
    if (curr1 === curr2) {
        alertBox.textContent = 'Choose different currencies';
    } else {
        alertBox.textContent = ''; // Clear any previous alerts
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/latest?amount=${value}&from=${curr1}&to=${curr2}`)
            .then(resp => resp.json())
            .then(data => {
                result.value = Object.values(data.rates)[0];
            })
            .catch(error => {
                console.error('Error fetching currency data:', error);
            });
    }
}