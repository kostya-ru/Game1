'use strict';
window.addEventListener('DOMContentLoaded', function () {

    let container = document.querySelector('.container'),
        header = document.querySelector('header');

    //функция создания игровоого поля, где q — кол-во кнопок
    const createField = function (q) {
        for (let i = 0; i < q; i++) {
            let newBtn = document.createElement('div');
            newBtn.classList.add('button');
            container.appendChild(newBtn);
        }
    };

    createField(15);


    //определяем массив с кнопками, определяем в нём случайную проигрышную, красим для наглядности
    let btn = document.querySelectorAll('.button'),
        rand = 0,
        clicked = 1;
    console.log(rand);
    //btn[rand].style.backgroundColor = 'red';

    //функция проигрышной кнопки
    const endGame = function () {
        for (let i = 0; i < btn.length; i++) {
            if (i == rand) {
                btn[i].textContent = 'AGAIN';
            } else {
                btn[i].textContent = 'YOU LOSE';
                btn[i].removeEventListener('click', notLose);
            }
        }
        let audio = new Audio('loser.mp3');
        audio.play();
        header.textContent = 'You lose!';
        btn[rand].style.backgroundColor = '#e5c2f2';
        btn[rand].removeEventListener('click', endGame);
        btn[rand].addEventListener('click', newGame);
    };

    //функция начала новой игры
    const newGame = function () {
        console.log(header);
        header.textContent = 'Push any button!';
        btn[rand].style.backgroundColor = '#93f5f3';
        btn[rand].removeEventListener('click', newGame);
        rand = ((Math.random()) * (btn.length - 1)).toFixed();
        clicked = 1;
        //btn[rand].style.backgroundColor = 'red';
        for (let i = 0; i < btn.length; i++) {
            btn[i].textContent = '';
            if (i == rand) {
                btn[i].addEventListener('click', endGame);
            } else {
                btn[i].addEventListener('click', notLose);
            }
        }
        console.log(rand);
    };

    //функция действий всех кнопок, кроме кнопки проигрыша, вписываем в каждую нажатую кнопку счётчик
    const notLose = function (event) {
        event.target.textContent = clicked;
        event.target.removeEventListener('click', notLose);
        console.log(clicked);
        clicked++;
        if(clicked == 15){
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