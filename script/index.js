function createPlayground() {
    let quantity = 0;
    let sizeIcon = getSizeIcon();

    console.log(sizeIcon);

    while (quantity < numberCoupleIcons * 2) {
        let icon = document.createElement('div');
        icon.style.width = sizeIcon.width + 'px';
        icon.style.margin = sizeIcon.margin + 'px';
        icon.style.height = sizeIcon.height + 'px';
        icon.className = 'icon';


        playground.append(icon);

        quantity++;
    }

}

function getSizeIcon() {
    let checkNumber = 1;
    let numberIconsWidth = 1;
    let icon = [];

    while (checkNumber <= numberCoupleIcons) {
        if (Math.ceil(Math.sqrt(numberCoupleIcons * 2)) % checkNumber === 0) {
            numberIconsWidth = checkNumber;
        }

        checkNumber++;
    }
    console.log(numberIconsWidth);

    let widthScreen = document.documentElement.clientWidth * 0.8;
    icon.width = widthScreen / (numberIconsWidth + 1);
    icon.height = widthScreen / (numberIconsWidth + 1);
    icon.margin = (widthScreen - icon.width * numberIconsWidth) / numberIconsWidth / 2

    return icon;
}

const playground = document.querySelector('.playground');

let numberCoupleIcons = 50;

createPlayground();
