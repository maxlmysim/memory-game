function preloadImages() {
    heroes.forEach((item) => {
        const img = new Image();
        img.src = `./assets/img/${item}.jpg`;
    });
}

function createPlayground() {
    loadLocalStorage();
    changeSettings();

    let quantity = 0;
    let sizeIcon = getSizeIcon();

    while (quantity < numberIcons) {
        let icon = document.createElement('img');
        icon.src = './assets/img/the-avengers.jpg';
        icon.style.width = sizeIcon.width + 'px';
        icon.style.height = sizeIcon.height + 'px';
        playground.style.gap = sizeIcon.gap + 'px';
        icon.className = 'icon';

        playground.append(icon);

        quantity++;
    }

    document.querySelector('.container-setting').style.width = playground.clientWidth + 'px';

    createGame();
}

function getSizeIcon() {
    let icon = [];
    let sizePlayGround = Math.min(document.documentElement.clientWidth * 0.7, document.documentElement.clientHeight * 0.7);

    playground.style.width = sizePlayGround + 'px';
    playground.style.height = sizePlayGround + 'px';

    icon.width = sizePlayGround / (Math.sqrt(numberIcons) + 1);
    icon.height = icon.width;
    icon.gap = (sizePlayGround - (icon.width * Math.sqrt(numberIcons))) / (Math.sqrt(numberIcons) + 1);

    return icon;
}

function createGame() {
    let icons = Array.from(document.querySelectorAll('.icon'));
    let hero = heroes.slice(0, difficulty);

    icons.forEach((item) => {
        item.dataset.isOpen = 'false';
    });

    while (icons.length) {
        let randIcon1 = icons.splice([Math.floor(Math.random() * icons.length)], 1);
        let randIcon2 = icons.splice([Math.floor(Math.random() * icons.length)], 1);
        let randHeroNum = Math.floor(Math.random() * hero.length);

        randIcon1[0].dataset.hero = heroes[randHeroNum];
        randIcon2[0].dataset.hero = heroes[randHeroNum];
    }
}

function checkCouple(event) {
    let hero = event.target.dataset.hero;

    currentScore++;
    document.querySelector('.current-score').textContent = `Score: ${currentScore}`;

    event.target.style.animation = `rotateY2 ${animationDuration}s linear`;
    listCheckCouple.push(event.target);


    setTimeout(() => {
        event.target.style.animation = `rotateY1 ${animationDuration}s linear`;
        event.target.src = `./assets/img/${hero}.jpg`;
    }, animationDuration * 1000);

    if (listCheckCouple.length > 1) {

        if (listCheckCouple[0].dataset.hero === listCheckCouple[1].dataset.hero && listCheckCouple[0] !== listCheckCouple[1]) {
            listCheckCouple[0].dataset.isOpen = 'true';
            listCheckCouple[1].dataset.isOpen = 'true';
            listCheckCouple.length = 0;
            checkEndGame();
            return;
        }

        setTimeout(() => {
            listCheckCouple[0].src = `./assets/img/the-avengers.jpg`;
            listCheckCouple[1].src = `./assets/img/the-avengers.jpg`;
            listCheckCouple.length = 0;
        }, animationDuration * 1000 * 2 + 500);
    }

}

function checkEndGame() {
    let checkList = Array.from(document.querySelectorAll('.icon'));
    let isEndGame = checkList.every(item => item.dataset.isOpen === 'true');

    if (isEndGame) {
        bestScore.push(currentScore);
        bestScore.sort((a, b) => a - b)
            .splice(9, 1);
        localStorage.setItem('bestScore', bestScore);
    }


}

function newGame() {
    let checkList = Array.from(document.querySelectorAll('.icon'));
    checkList.forEach((item) => item.remove());
    createPlayground();
    currentScore = 0;
    document.querySelector('.current-score').textContent = `Score: ${currentScore}`;
}

function SettingsMenu() {
    document.querySelector('.setting-menu').classList.toggle('active');
}

function changeSettings() {
    let settings = ['difficulty', 'anim-speed', 'playground'];

    settings.forEach((item) => checkSetting(item));

    document.querySelector('.setting-menu').classList.remove('active');
}

function checkSetting(item) {
    if (item === 'difficulty') {
        document.querySelectorAll(`[name=${item}]`)
            .forEach((input) => {
                if (input.checked) {
                    difficulty = +input.value;
                    localStorage.setItem(item, input.id);
                }
            });
    }

    if (item === 'playground') {
        document.querySelectorAll(`[name=${item}]`)
            .forEach((input) => {
                if (input.checked) {
                    numberIcons = +input.value;
                    // numberIcons = 6;

                    localStorage.setItem(item, input.id);
                }
            });
    }

    if (item === 'anim-speed') {
        document.querySelectorAll(`[name=${item}]`)
            .forEach((input) => {
                if (input.checked) {
                    animationDuration = +input.value;
                    localStorage.setItem(item, input.id);
                }
            });
    }
}

function loadLocalStorage() {
    for (let key in localStorage) {
        if (key === 'playground') {
            document.querySelector(`#${localStorage[key]}`).checked = true;
        }

        if (key === 'difficulty') {
            document.querySelector(`#${localStorage[key]}`).checked = true;
        }

        if (key === 'anim-speed') {
            document.querySelector(`#${localStorage[key]}`).checked = true;
        }
    }

    if (localStorage['bestScore']) {
        bestScore = localStorage['bestScore'].split(',').map(item => +item);
    }
}

function applySettings() {
    changeSettings();
    newGame();
}

const playground = document.querySelector('.playground');
let heroes = ['captain-america', 'ironman', 'spiderman', 'thor', 'fantastic-four', 'batman', 'superman', 'flash', 'green-arrow', 'aquaman', 'green-lantern'];

let difficulty = 4;
let animationDuration = 0.2;
let numberIcons = 16;
let listCheckCouple = [];
let currentScore = 0;
let newGameBtn = document.querySelector('.btn-new-game');
let settingsBtn = document.querySelector('.btn-setting');
let applySettingsBtn = document.querySelector('.btn-apply-settings');
let bestScore = [];

preloadImages();
createPlayground();

playground.addEventListener('click', function (event) {
        if (event.target.dataset.isOpen === 'false') {
            checkCouple(event);
        }
    },
);

newGameBtn.addEventListener('click', newGame);
settingsBtn.addEventListener('click', SettingsMenu);
applySettingsBtn.addEventListener('click', applySettings);

