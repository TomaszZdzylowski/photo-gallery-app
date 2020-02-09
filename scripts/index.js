var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");
require("firebase/storage");


var firebaseConfig = {
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


const inputFile = document.querySelector('.input-file');
const flexboxContainer = document.querySelector('.l-flexbox-container');
const storageRef = firebase.storage().ref('');



inputFile.addEventListener('change', function (e) {
    var file = e.target.files[0];
    // Create the file metadata
    var metadata = {
        contentType: 'image/jpeg'
    };
    // Upload file and metadata 
    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function complete() {
            // Upload completed successfully, now we can get the download URL

            uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                const img = document.createElement('img');
                img.classList.add('c-flex-image');
                img.src = url;
                flexboxContainer.append(img);
            });
        });

});
var listRef = storageRef.child('images/');
// Find all the prefixes and items.
listRef.listAll().then(function (res) {
    res.items.forEach(function (itemRef) {
        itemRef.getDownloadURL().then(function (url) {
            const img = document.createElement('img');
            img.classList.add('c-flex-image');
            img.src = url;
            flexboxContainer.append(img);

        });
    });
}).catch(function (error) {
    console.log("Err");
});





// storageRef.child('images/unnamed.jpg').getDownloadURL().then(function (url) {


//     const img = document.createElement('img');
//     img.src = url;
//     img.classList.add('flex-image');
//     flexContainer.append(img);
// });

// fileInput.addEventListener('change', function (e) {
//     // Get File
//     const file = e.target.files[0];

//     //Create a storage reference
//     storageRef = firebase.storage().ref('images/' + file.name);

//     //upload file
//     const task = storageRef.put(file);

//     task.on('state_changed',
//         function progress(snapshot) {

//         },
//         function error(err) {

//         },
//         function complete() {
//             storageRef.child(file.name).getDownloadURL().then(function (url) {

//                 const img = document.getElementById('myimg');
//                 img.src = url;
//             }).catch(function (error) {
//                 console.log("err");


//             });
//         }
//     )

// })
const siteNavBar = document.querySelector('.c-site-nav__bar');
const siteNavList = document.querySelector('.c-site-nav__list');
siteNavBar.addEventListener('click', () => {
    siteNavList.classList.toggle('h-mobile');

});
const siteNavExit = document.getElementById('exit');
siteNavExit.addEventListener('click', () => {
    siteNavList.classList.toggle('h-mobile');

})

