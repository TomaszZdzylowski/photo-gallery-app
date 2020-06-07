import '../../scss/formsStyles/forms.scss';
import { firebaseAuth } from '../firebaseApi';


const loginForm = document.querySelector('.js-loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(response => {

            loginForm.reset();
            window.location = 'index.html';
        })
})



