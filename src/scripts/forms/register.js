import '../../scss/formsStyles/forms.scss';
import { firebaseAuth } from '../firebaseApi';

const registerForm = document.querySelector('.js-registerForm');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = registerForm['email'].value;
    const password = registerForm['password'].value;

    console.log(email, password)
    firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            console.log(response)
            registerForm.reset();
        })
})
