const userField = document.querySelector('.userField');
const usernameButton = document.querySelector('.usernameButton');
const randomAlbum = document.querySelector('.randomAlbum');
let username = document.querySelector('.userID');
const resetUserID = document.querySelector('.resetUserID');
const randomButton = document.querySelector('.randomButton');
const error404 = document.querySelector('.error404');

//Click on SAVE button (username field)
usernameButton.addEventListener('click', () => {
    if (username.value === '') {
        username.style.border = "2px solid red";
    } else {
        username = username.value;
        userField.classList.add('not-active');
        const hi = document.querySelector('.hi');
        const description = document.querySelector('.description');
        hi.innerHTML = `<p class="first">Hi <span class="pseudo">${username}</span>.</p><p class="second">Let me find your next listening.</p>`;
        resetUserID.classList.remove('not-active');
        randomButton.classList.remove('not-active');
        description.classList.add('not-active');
    }
});

//Click on RESET button
resetUserID.addEventListener('click', () => {
    window.location.reload(true);
});

//Retrieve data from Discogs' Api
const fetchRandomAlbum = async () => {
    try {
        const res = await fetch(`https://api.discogs.com/users/${username}/collection/folders/0/releases`)
        .then((resp) => resp.json())
        .then(function(data) {
            //Get a random number from the collection (only based on the first 50 items)
            const randomNum = Math.floor(Math.random() * data.releases.length);
            //Show the artist and album title of the Random Album :
            const artistName = document.querySelector('.artistName');
            const albumTitle = document.querySelector('.albumTitle');
            randomAlbum.classList.remove('not-active');
            artistName.textContent = data.releases[randomNum].basic_information.artists[0].name;
            albumTitle.textContent = data.releases[randomNum].basic_information.title;
        });    
        
    } catch (error) {
        randomAlbum.classList.add('not-active');
        error404.classList.remove('not-active');
    }
}