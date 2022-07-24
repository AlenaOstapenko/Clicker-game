const prettyPrint = (obj) => {
    const bottomSlot = document.querySelector('#bottom-slot > pre');
    bottomSlot.innerHTML = JSON.stringify(obj);
}

const { form } = document.forms

function retrieveFormData (event){
    event.preventDefault();

    const values = {};

    for (let field of form) {
        const { name } = field;

        if(name) {
            const { value } = field;
            values [name] = value;
        }
        prettyPrint(values);
    }
}
function removeForm() {
    document.getElementById("form").reset();}

    //form.addEventListener('submit', retrieveFormData);
form.addEventListener('reset', removeForm)



/*const form = document.querySelector('#form')

function retrieveFormData (event){
 event.preventDefault();
 
 const nickname = form.querySelector("[name='nickname']"),
       firstname = form.querySelector("[name='firstname']"),
       lastname = form.querySelector("[name='lastname']"),
       email = form.querySelector("[name='email']");
 const values = {
    nicknamee: nickname.value,
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
 }
 prettyPrint(values);
}

form.addEventListener('submit', retrieveFormData)*/