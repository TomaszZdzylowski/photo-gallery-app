import '../scss/style.scss';
import { firebaseStorage } from './firebaseApi';
import { logoutUser } from './userService';



const inputFile = document.querySelector('.c-input-file');
const flexList = document.querySelector('.c-flex-list');


const createElementForImage = (imageUrl) => {
    const flexItem = document.createElement('li');
    const flexImage = document.createElement('img');

    flexItem.classList.add('c-flex-list__item');
    flexImage.classList.add('c-flex-list__image');
    flexImage.src = imageUrl;
    flexImage.setAttribute("alt", "image");
    flexList.append(flexItem);
    flexItem.append(flexImage);
}
inputFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    const fileNameWithoutExtention = fileName.replace(/\.[^/.]+$/, "");
    let newDate = new Date().getTime();

    //console.log(newDate);


    const imageRef = firebaseStorage.child(`photos/${fileNameWithoutExtention}-${newDate}`);
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();

        img.src = e.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext("2d");
            const imageDataUrl = canvas.toDataURL("image/png");
            const uploadImage = imageRef.putString(imageDataUrl, "data_url");

            canvas.width = 480;
            canvas.height = 480;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            inputFile.value = "";

            uploadImage.on("state_changed", null, null, function complete() {
                uploadImage.snapshot.ref.getDownloadURL()
                    .then(url => createElementForImage(url));
            })
        }
    }
    reader.readAsDataURL(file);
})
const downloadImage = firebaseStorage.child("photos");

downloadImage.listAll()
    .then(function (result) {
        const resultItems = result.items;
        resultItems.forEach((item) => {
            item.getDownloadURL()
                .then(url => createElementForImage(url))
        })
    }).catch(err => console.log(err));



const siteNavList = document.querySelector('.c-site-nav__list');
const siteFooter = document.querySelector('.l-footer');

const siteNavBar = document.querySelector('.js-menu');

siteNavBar.addEventListener('click', () => {
    siteNavList.classList.toggle('h-show');
    siteNavBar.classList.toggle('h-show');
    siteFooter.classList.toggle('h-stack-order');
    siteNavList.classList.toggle('h-rightToLeft');


});
const siteNavExit = document.querySelector('.js-exit');

siteNavExit.addEventListener('click', () => {
    siteNavList.classList.toggle('h-show');
    siteNavBar.classList.toggle('h-show');
    siteFooter.classList.toggle('h-stack-order');
    siteNavList.classList.toggle('h-rightToLeft');

})


const logoutButton = document.querySelector('.js-logoutUser');

logoutUser(logoutButton);


