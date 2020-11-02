const userField = document.querySelector('.userField');
const usernameButton = document.querySelector('.usernameButton');
const randomAlbum = document.querySelector('.randomAlbum');
const username = document.querySelector('.userID');
const resetUserID = document.querySelector('.resetUserID');
const loader = document.querySelector('.loader');
const vinylBg = document.querySelector('.vinyl');
const randomButton = document.querySelector('.randomButton');
const randomAlbumBtn = document.querySelector('.randomAlbumBtn');
const artistName = document.querySelector('.artistName');
const albumTitle = document.querySelector('.albumTitle');
const error404 = document.querySelector('.error404');
let fullArray = [];

//Click on SAVE button (username field)
usernameButton.addEventListener('click', () => {
    if (username.value === '') {
        username.style.border = "2px solid red";
    } else {
        usernameValue = username.value;
        userField.classList.add('not-active');
        const hi = document.querySelector('.hi');
        const description = document.querySelector('.description');
        hi.innerHTML = `<p class="first">Hi <span class="pseudo">${usernameValue}</span>.</p><p class="second">Let me find your next listening.</p>`;
        resetUserID.classList.remove('not-active');
        randomButton.classList.remove('not-active');
        description.classList.add('not-active');
    }
});

//Click on RANDOMIZE Button
randomAlbumBtn.addEventListener('click', () => {
    if (fullArray.length == 0) { //This is the first time button is clicked, so Array is empty. Launch function to get data.     
        loader.classList.remove('not-active');
        getRandomAlbum();
    } else { //The Array is full of Data.. so don't fetch over and over. Just pick a random number and show me the release ! 
        loader.classList.add('not-active');
        showRandomAlbum();
    }
});

//Click on RESET button
resetUserID.addEventListener('click', () => {window.location.reload(true);});

//Get a random number based on Discogs' collection length.
const getRandomNum = (number) => Math.floor(Math.random() * number.length);

//Retrieve data from Discogs' Api (Only the first 50 items !)
// const getRandomAlbumTiny = async () => {
//     try {
//         const resp = await fetch(`https://api.discogs.com/users/${usernameValue}/collection/folders/0/releases`)
//         .then((resp) => resp.json())
//         .then(function(data) {
//             //Get a random number from the collection (only based on the first 50 items)
//             const randomNum = Math.floor(Math.random() * data.releases.length);
//             //Show the artist and album title of the Random Album :
//             randomAlbum.classList.remove('not-active');
//             artistName.textContent = data.releases[randomNum].basic_information.artists[0].name;
//             albumTitle.textContent = data.releases[randomNum].basic_information.title;
//         });    
        
//     } catch (error) {
//         randomAlbum.classList.add('not-active');
//         error404.classList.remove('not-active');
//     }
// }

//Retrieve data from Discogs' Api (All items !). Need improvements because of slowlyness due to the Discogs' collection length.
const getRandomAlbum = async () => {
        //Fetch user's collection to retrieve some infos like total items, total pages, etc.
        const response = await fetch(`https://api.discogs.com/users/${usernameValue}/collection/folders/0/releases`);
        if (response.ok) {
            let data = await response.json();
            //Show spinning vinyl while data load.
            randomAlbum.classList.remove('not-active');
            vinylBg.classList.remove('not-active');
            //Call function to fetch all items from the entire collection's pages. 
            getAllData(data);
        } else {
        randomAlbum.classList.add('not-active');
        error404.classList.remove('not-active');
    }
}
//Function to retrieve all items from all collection's pages.
const getAllData = async (data) => {
    const nbrPages = data.pagination.pages;
    //Fetch data of all pages and store all items from Discogs' collection in fullArray.
    for (let i = nbrPages; i > 0; i--) {
        const totalResponse = await fetch(`https://api.discogs.com/users/${usernameValue}/collection/folders/0/releases?page=${i}`);
        let fullData = await totalResponse.json();
        let fullItems = fullData.releases;
        fullItems.forEach(element => {
            fullArray.push(element);
        });
    }
    //Display artist name and album title.
    loader.classList.add('not-active');
    showRandomAlbum();
}

//Function to display artist name and album title.
const showRandomAlbum = () => {
    let randomNumber = getRandomNum(fullArray);
    let randomArtist = fullArray[randomNumber].basic_information.artists[0].name;
    let randomTitle = fullArray[randomNumber].basic_information.title;
    artistName.classList.remove('not-active');
    albumTitle.classList.remove('not-active');
    artistName.textContent = randomArtist;
    albumTitle.textContent = randomTitle;
}