function createPlayground() {
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

    createGame();
}

function getSizeIcon() {
    let icon = [];
    let sizePlayGround = Math.min(document.documentElement.clientWidth * 0.75, document.documentElement.clientHeight * 0.75);

    playground.style.width = sizePlayGround + 'px';
    playground.style.height = sizePlayGround + 'px';

    icon.width = sizePlayGround / (Math.sqrt(numberIcons) + 1);
    icon.height = icon.width;
    icon.gap = (sizePlayGround - (icon.width * Math.sqrt(numberIcons))) / (Math.sqrt(numberIcons) + 1);

    return icon;
}

function createGame() {
    let icons = Array.from(document.querySelectorAll('.icon'));
    let hero = heroes.slice(0, 5);

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
    let preOpen = document.querySelector('[data-open]');

    event.target.style.animation = `rotateY2 ${animationDuration}s linear`;
    event.target.dataset.open = 'true';

    setTimeout(() => {
        event.target.style.animation = `rotateY1 ${animationDuration}s linear`;
        event.target.src = `./assets/img/${hero}.jpg`;
    }, animationDuration * 955);

    console.log(preOpen);

    if (preOpen) {

        if (preOpen.dataset.hero !== hero) {
            setTimeout(() => {
                event.target.src = `./assets/img/the-avengers.jpg`;
                preOpen.src = `./assets/img/the-avengers.jpg`;
            }, animationDuration * 2000 + 500);

        }

        delete preOpen.dataset.open;
        delete event.target.dataset.open;
    }

}

const playground = document.querySelector('.playground');
let numberIcons = 36;
let heroes = ['captain-america', 'ironman', 'spiderman', 'thor', 'fantastic-four', 'batman', 'superman', 'flash', 'green-arrow', 'aquaman', 'green-lantern'];
let animationDuration = 0.2;

createPlayground();

playground.addEventListener('click', function (event) {
        if (event.target.dataset.hero) {
            checkCouple(event);
        }
    },
);



