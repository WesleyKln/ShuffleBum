const userField = document.querySelector('.userField');
const usernameButton = document.querySelector('.usernameButton');
let username = document.querySelector('.userID');
const resetUserID = document.querySelector('.resetUserID');
const randomButton = document.querySelector('.randomButton');
const error404 = document.querySelector('.error404');

usernameButton.addEventListener('click', () => {
    if (username.value === '') {
        username.style.border = "2px solid red";
    } else {
        username = username.value;
        userField.classList.add('not-active');
        const hi = document.querySelector('.hi');
        hi.innerHTML = `Hi <span class="pseudo">${username}</span>. </br><p>Let me find your next listening by clicking on <span>Randomize</span> button.</p>`;
        resetUserID.classList.remove('not-active');
        randomButton.classList.remove('not-active');

    }
});
resetUserID.addEventListener('click', () => {
    window.location.reload(true);
});


const fetchRandomAlbum = async () => {
    try {
        const res = await fetch(`https://api.discogs.com/users/${username}/collection/folders/0/releases`)
        .then((resp) => resp.json())
        .then(function(data) {
            //Get a random number from the collection (only based on the first 50 items)
            const randomNum = Math.floor(Math.random() * data.releases.length);
            //Show the artist and album title of the Random Album :
            const randomAlbum = document.querySelector('.randomAlbum');
            const artistName = document.querySelector('.artistName');
            const albumTitle = document.querySelector('.albumTitle');
            randomAlbum.classList.remove('not-active');
            artistName.textContent = data.releases[randomNum].basic_information.artists[0].name;
            albumTitle.textContent = data.releases[randomNum].basic_information.title;
            console.log()
        });    
        
    } catch (error) {
        error404.classList.remove('not-active');
    }
}