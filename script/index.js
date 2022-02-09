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
        let card = document.createElement('div');
        let shirt = document.createElement('img');
        let icon = document.createElement('img');

        card.style.width = sizeIcon.width + 'px';
        card.style.height = sizeIcon.height + 'px';
        card.className = 'card';

        shirt.src = './assets/img/the-avengers.jpg';
        shirt.className = 'shirt';

        icon.className = 'icon';

        playground.style.gap = sizeIcon.gap + 'px';

        card.append(shirt, icon);
        playground.append(card);

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

    icon.height = icon.width = sizePlayGround / (Math.sqrt(numberIcons) + 1);
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
        randIcon1[0].src = `./assets/img/${heroes[randHeroNum]}.jpg`;
        randIcon2[0].src = `./assets/img/${heroes[randHeroNum]}.jpg`;
    }
}

function checkCouple(event) {
    let selectedCard = event.path.find(item => {
        if (item.classList.contains('card')) return true;
    });
    let hero = Array.from(selectedCard.children).find(item => item.classList.contains('icon'));

    currentScore++;
    document.querySelector('.current-score').textContent = `Score: ${currentScore}`;

    selectedCard.classList.add('flip');
    selectedCard.style.transition = animationDuration + 's';

    listCheckCouple.push(hero);

    if (listCheckCouple.length > 1) {
        isCheckCouple = true;
        if (listCheckCouple[0].dataset.hero === listCheckCouple[1].dataset.hero && listCheckCouple[0] !== listCheckCouple[1]) {
            listCheckCouple[0].dataset.isOpen = 'true';
            listCheckCouple[1].dataset.isOpen = 'true';

            listCheckCouple.length = 0;
            checkEndGame();
            isCheckCouple = false;
            return;
        }

        setTimeout(() => {
            isCheckCouple = false;
            listCheckCouple[0].parentElement.classList.remove('flip');
            listCheckCouple[1].parentElement.classList.remove('flip');
            listCheckCouple.length = 0;
        }, animationDuration * 2500);
    }
}

function checkEndGame() {
    let checkList = Array.from(document.querySelectorAll('.icon'));
    let isEndGame = checkList.every(item => item.dataset.isOpen === 'true');

    if (isEndGame) {
        document.querySelector('.end-game').classList.add('active');
        document.querySelector('.end-game__score').textContent = 'Your score: ' + currentScore;

        if (bestScore.includes(currentScore)) return;
        bestScore.push(currentScore);
        bestScore.sort((a, b) => a - b)
            .splice(9, 1);
        localStorage.setItem('bestScore', bestScore);
    }
}

function newGame() {
    document.querySelector('.end-game').classList.remove('active');

    let checkList = Array.from(document.querySelectorAll('.card'));
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

function updateBestScore() {
    let scoreList = Array.from(document.querySelectorAll('.positionScore'));

    document.querySelector('.table-score').classList.add('active');
    document.querySelector('.setting-menu').classList.remove('active');

    scoreList.forEach((item, index) => {
        item.textContent = bestScore[index];
    });

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
let bestScore = [];
let isCheckCouple = false;

let btnBestScore = document.querySelectorAll('.btn-best-scores');
let newGameBtn = document.querySelectorAll('.btn-new-game');
let settingsBtn = document.querySelector('.btn-setting');
let applySettingsBtn = document.querySelector('.btn-apply-settings');
let btnCloseBestScore = document.querySelector('.btn-close-best-score');

preloadImages();
createPlayground();

playground.addEventListener('click', function (event) {
        if (isCheckCouple) return;
        if (event.target.classList.contains('shirt')) {
            checkCouple(event);
        }
    },
);

btnBestScore.forEach(btn => btn.addEventListener('click', updateBestScore));
newGameBtn.forEach(btn => btn.addEventListener('click', newGame));
settingsBtn.addEventListener('click', SettingsMenu);
applySettingsBtn.addEventListener('click', applySettings);
btnCloseBestScore.addEventListener('click', function () {
    document.querySelector('.table-score').classList.remove('active');
});

