import { firebaseAuth } from './firebaseApi';

export const logoutUser = (button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        firebaseAuth.signOut();

    })

}


const setupUI = (user) => {
    const loggedOutElements = document.querySelectorAll('.js-loggedOut');
    const loggedInElements = document.querySelectorAll('.js-loggedIn');

    if (user) {
        loggedOutElements.forEach(item => item.style.display = "none");
        loggedInElements.forEach(item => item.style.display = "block");
    } else {
        loggedOutElements.forEach(item => item.style.display = "block");
        loggedInElements.forEach(item => item.style.display = "none");
    }

}

firebaseAuth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in', user)
        setupUI(user);

    } else {
        console.log(`user logged out`);
        setupUI();
    }
})