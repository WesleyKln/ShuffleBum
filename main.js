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
    if (username.value === '') { //Show a messaage if the field is empty
        username.style.border = "2px solid red";
    } else { //Save the username then show some information and retrieve in background all the Discogs' items from this user 
        usernameValue = username.value;
        userField.classList.add('not-active');
        const hi = document.querySelector('.hi');
        const description = document.querySelector('.description');
        hi.innerHTML = `<p class="first">Hi <span class="pseudo">${usernameValue}</span>.</p><p class="second">Let me find your next listening.</p>`;
        resetUserID.classList.remove('not-active');
        randomButton.classList.remove('not-active');
        description.classList.add('not-active');
        getRandomAlbum();
    }
});

//Click on RANDOMIZE Button
randomAlbumBtn.addEventListener('click', () => {
    //Even if the Array isn't fully filled (Depend of Discogs' collection length), it will show an item at random. 
        //Show spinning vinyl while data load.
        randomAlbum.classList.remove('not-active');
        vinylBg.classList.remove('not-active');
        showRandomAlbum();
});

//Click on RESET button
resetUserID.addEventListener('click', () => {window.location.reload(true);});

//Get a random number based on Discogs' collection length.
const getRandomNum = (number) => Math.floor(Math.random() * number.length);

//Retrieve data from Discogs' Api (All items !).
const getRandomAlbum = async () => {
    const hiSecond = document.querySelector('.second');
    const errorEmpty = document.querySelector('.errorEmpty');
        //Fetch user's collection to retrieve some infos like total items, total pages, etc.
        const response = await fetch(`https://api.discogs.com/users/${usernameValue}/collection/folders/0/releases`);
        if (response.ok) {
            let data = await response.json();
            if (data.releases.length == 0) { //If the response is OK but the collection is empty, show instructions to resolve the error
            hiSecond.classList.add('not-active');
            randomAlbumBtn.classList.add('not-active');
            errorEmpty.classList.remove('not-active');
            } else { //If the response is OK and the collection isn't empty, call function to fetch all items from the entire collection's pages. 
                getAllData(data);
            }
        } else { //If there is an error, show instructions to resolve the error
        hiSecond.classList.add('not-active');
        randomAlbum.classList.add('not-active');
        randomAlbumBtn.classList.add('not-active');
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
        //Push all items from each Discogs' pages in fullArray
        fullItems.forEach(element => {
            fullArray.push(element);
        });
    }
}

//Function to display artist name and album title.
const showRandomAlbum = () => {
    const randomNumber = getRandomNum(fullArray);
    const randomArtist = fullArray[randomNumber].basic_information.artists[0].name;
    const randomTitle = fullArray[randomNumber].basic_information.title;
    artistName.classList.remove('not-active');
    albumTitle.classList.remove('not-active');
    artistName.textContent = randomArtist;
    albumTitle.textContent = randomTitle;
}