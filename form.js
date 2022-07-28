const form = document.getElementById('form');
const nickname = document.getElementById('nickname');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');

form.addEventListener('submit', event => {
    event.preventDefault();

    const isValid = validateInputs();
    if(isValid){
        document.login.submit();
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    let isValid = true;
    const nicknameValue = nickname.value.trim();
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();

    if(nicknameValue === '') {
        setError(nickname, 'Nickname is required');
        isValid = false;
    } else {
        setSuccess(nickname);
       
    }

    if(firstnameValue === '') {
        setError(firstname, 'Firstname is required');
        isValid = false;
    } else {
        setSuccess(firstname);
        
    }

    if(lastnameValue === '') {
        setError(lastname, 'Lastname is required');
        isValid = false;
    } else {
        setSuccess(lastname);
        
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)){
        setError(email, 'Provide a valid email');
        isValid = false;
    } else {
        setSuccess(email); 
    }
    return isValid;
};

