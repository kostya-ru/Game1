'use strict';
window.addEventListener('DOMContentLoaded', function () {

    let container = document.querySelector('.container'),
        header = document.querySelector('header'),
        quantity = 15;

    //функция создания игрового поля, где q — кол-во кнопок
    const createField = function (q) {
        for (let i = 0; i < q; i++) {
            let newBtn = document.createElement('div');
            newBtn.classList.add('button');
            container.appendChild(newBtn);
        }
    };

    createField(quantity);

    //определяем массив с кнопками и счётчик нажатий
    let btn = document.querySelectorAll('.button'),
        rand = 0,
        clicked = 0;

    //функция проигрышной кнопки
    const endGame = function () {

        btn.forEach((item, index) => {
            if (index === rand) {
                item.textContent = 'AGAIN';
            } else {
                item.textContent = 'YOU LOSE';
                item.removeEventListener('click', notLose);
            }
        });
        let audio = new Audio('loser.mp3');
        audio.play();
        header.textContent = 'You lose!';
        btn[rand].style.backgroundColor = '#e5c2f2';
        btn[rand].removeEventListener('click', endGame);
        btn[rand].addEventListener('click', newGame);
    };

    //функция начала новой игры (проигрышную кнопку красим для наглядности, строка закомментирована)
    const newGame = function () {
        header.textContent = 'Push any button!';
        btn[rand].style.backgroundColor = '#93f5f3';
        btn[rand].removeEventListener('click', newGame);
        rand = ((Math.random()) * (btn.length - 1)).toFixed();
        clicked = 0;
        //btn[rand].style.backgroundColor = 'red';
        console.log(rand);
        btn.forEach((item, index) => {
            item.textContent = '';
            if (index == rand) {
                item.addEventListener('click', endGame);
            } else {
                item.addEventListener('click', notLose);
            }
        });
    }

    //функция действий всех кнопок, кроме кнопки проигрыша, вписываем в каждую нажатую кнопку счётчик
    const notLose = function (event) {
        clicked++;
        event.target.textContent = clicked;
        event.target.removeEventListener('click', notLose);
        if (clicked === (quantity - 1)) {
            let audio = new Audio('winner.mp3');
            audio.play();
            btn[rand].textContent = 'AGAIN';
            header.textContent = 'You win!!!1111';
            btn[rand].style.backgroundColor = '#FFDF00';
            btn[rand].removeEventListener('click', endGame);
            btn[rand].addEventListener('click', newGame);
        }
    };

    newGame();
});
