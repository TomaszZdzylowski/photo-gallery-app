(() => {
    const firebase = require("firebase/app");
    require("firebase/auth");
    require("firebase/database");
    require("firebase/storage");

    const firebaseConfig = {
        apiKey: "AIzaSyAPXE2T7jDmg3Ak6vpF-JzzX4VL-qqELb0",
        authDomain: "fir-crash-app.firebaseapp.com",
        databaseURL: "https://fir-crash-app.firebaseio.com",
        projectId: "fir-crash-app",
        storageBucket: "fir-crash-app.appspot.com",
        messagingSenderId: "229130637404",
        appId: "1:229130637404:web:8ae9841526a1bef8211699"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const inputFile = document.querySelector('.c-input-file');
    const flexList = document.querySelector('.c-flex-list');

    const firebaseStorage = firebase.storage().ref();

    const createElementForImage = (imageUrl) => {
        const flexItem = document.createElement('li');
        flexItem.classList.add('c-flex-list__item');
        const flexImage = document.createElement('img');
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
        console.log(newDate);


        const imageRef = firebaseStorage.child(`photos/${fileNameWithoutExtention}-${newDate}`);
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext("2d");
                canvas.width = 480;
                canvas.height = 480;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const imageDataUrl = canvas.toDataURL("image/png");
                const uploadImage = imageRef.putString(imageDataUrl, "data_url");
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



    const siteNavBar = document.querySelector('.c-site-nav__bar');
    const siteNavList = document.querySelector('.c-site-nav__list');
    const siteFooter = document.querySelector('.l-footer');

    siteNavBar.addEventListener('click', () => {
        siteNavList.classList.toggle('h-show');
        siteNavBar.classList.toggle('h-show');
        siteFooter.classList.toggle('h-stack-order');
        siteNavList.classList.toggle('h-smooth-menu');


    });
    const siteNavExit = document.getElementById('exit');
    siteNavExit.addEventListener('click', () => {
        siteNavList.classList.toggle('h-show');
        siteNavBar.classList.toggle('h-show');
        siteFooter.classList.toggle('h-stack-order');
        siteNavList.classList.toggle('h-smooth-menu');

    })



})()

