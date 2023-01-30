"use strict";
class gameTicTakToe {
    constructor() {
        // reqired elemets
        this.selectbox = document.querySelector('.select-box');
        this.selectXbtn = this.selectbox.querySelector('.playerX');
        this.selectObtn = this.selectbox.querySelector('.playerO');
        this.playboard = document.querySelector('.play-board');
        this.boxs = document.querySelectorAll('section span');
        this.players = document.querySelector('.players');
        this.PlayerXicon = "fas fa-times";
        this.PlayerOicon = "fas fa-circle";
        this.PlayerSign = "X";
        this.runbot = true;
        this.runcounter = [];
        this.resultbox = document.querySelector('.result-box');
        this.wontext = this.resultbox.querySelector('.won-text');
        this.replaybtn = this.resultbox.querySelector('button');
        this.replaybtn.addEventListener('click', () => {
            window.location.reload();
        });
        window.onload = () => {
            this.boxs.forEach(el => {
                el.setAttribute('onclick', "new gameTicTakToe().clickbox(this)");
            });
            this.selectbox.onclick = () => {
                this.selectbox.classList.add('hide');
                this.playboard.classList.add('show');
            };
            this.selectObtn.onclick = () => {
                this.selectbox.classList.add('hide');
                this.playboard.classList.add('show');
                this.players.setAttribute('class', 'players active player');
            };
        };
    }
    clickbox(e) {
        if (this.players.classList.contains('player')) {
            e.innerHTML = `<i class="${this.PlayerOicon}"></i>`;
            this.players.classList.toggle('active');
            this.PlayerSign = "O";
            e.setAttribute('id', this.PlayerSign);
        }
        else {
            e.innerHTML = `<i class="${this.PlayerXicon}"></i>`;
            this.players.classList.toggle('active');
            e.setAttribute('id', this.PlayerSign);
        }
        e.style.pointerEvents = 'none';
        this.playboard.style.pointerEvents = 'none';
        this.selectWinner();
        let randomdealy = ((Math.random() * 1000) + 20);
        setTimeout(() => {
            this.bot();
        }, randomdealy);
    }
    bot() {
        if (this.runbot) {
            let array = [];
            for (let index = 0; index < this.boxs.length; index++) {
                if (this.boxs[index].childElementCount == 0) {
                    array.push(index);
                }
            }
            this.PlayerSign = "O";
            let random = array[Math.floor(Math.random() * array.length)];
            if (array.length > 0) {
                if (this.players.classList.contains('player')) {
                    this.boxs[random].innerHTML = `<i class="${this.PlayerXicon}"></i>`;
                    this.players.classList.toggle('active');
                    this.PlayerSign = "X";
                    this.boxs[random].setAttribute('id', this.PlayerSign);
                }
                else {
                    this.boxs[random].innerHTML = `<i class="${this.PlayerOicon}"></i>`;
                    this.players.classList.toggle('active');
                    this.boxs[random].setAttribute('id', this.PlayerSign);
                }
                this.selectWinner();
                this.playboard.style.pointerEvents = 'auto';
                this.boxs[random].style.pointerEvents = 'none';
            }
        }
    }
    getid(idname) {
        let x = document.querySelector('.box' + idname);
        return x.id;
    }
    checkTreeid(val1, val2, val3, sign) {
        if (sign == (this.getid(val1)) && sign == (this.getid(val2)) && sign == (this.getid(val3))) {
            return true;
        }
    }
    selectWinner() {
        console.log();
        if (this.checkTreeid(1, 2, 3, this.PlayerSign) || this.checkTreeid(1, 4, 7, this.PlayerSign) || this.checkTreeid(2, 5, 8, this.PlayerSign) || this.checkTreeid(3, 6, 9, this.PlayerSign) || this.checkTreeid(4, 5, 6, this.PlayerSign) || this.checkTreeid(7, 8, 9, this.PlayerSign) || this.checkTreeid(1, 5, 9, this.PlayerSign) || this.checkTreeid(3, 5, 7, this.PlayerSign)) {
            this.runbot = false;
            setTimeout(() => {
                this.playboard.classList.remove('show');
                this.resultbox.classList.add('show');
                this.wontext.innerHTML = `player<p>${this.PlayerSign}</p> won the game!`;
            }, 400);
        }
        else if (document.querySelectorAll('section span i').length >= 9) {
            this.runbot = false;
            setTimeout(() => {
                this.playboard.classList.remove('show');
                this.resultbox.classList.add('show');
                this.wontext.innerHTML = "match hass been draw";
            }, 400);
        }
    }
}
new gameTicTakToe();
