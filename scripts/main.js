import { data } from "./data.js";

let button = document.getElementById("playbutton")
let playground = document.getElementById("playground")
let timer = document.getElementById("timer")
let allert = document.getElementById("alert")
let gameover = document.getElementById("gameover__box")

let me = document.getElementById("me")
let enemy = document.getElementById("enemy")

let brock = document.getElementById("1")
let bpaper = document.getElementById("2")
let bscissor = document.getElementById("3")

let elems = [brock, bpaper, bscissor]
let val = 0
let enemyval = Math.ceil(Math.random() * 3)


let getscore = localStorage.getItem("score")
let score = document.getElementById("score")
score.innerHTML = getscore || 0

for (const el of elems) {
    el.onclick = function(){
        setMeImg(el.id)
        val = el.id
    }
}

function setMeImg(mee){
    me.innerHTML = `
        <img src="./img/${data[mee-1].image}" width="50" height="50" alt="paper">
    `
}

function ShowResult(text, mee, enemyy){
    allert.innerHTML = text
    elements.style.display = "none"
    if(!mee){
        me.innerHTML = "nothing selected"
    }else {
        me.innerHTML = `
        <img src="./img/${data[mee-1].image}" width="50" height="50" alt="paper">
        `

        enemy.innerHTML = `
        <img src="./img/${data[enemyy-1].image}" width="50" height="50" alt="paper">
        `
    }
}

function setScore(){
    localStorage.setItem("score", +getscore + 1)
    score.innerHTML = +getscore + 1
}

function PlaygroundSpawn() {
    playground.style.visibility = "visible"
    playground.style.marginBottom = "100px"
    playground.style.marginTop = "80px"
    button.style.visibility = "hidden"

    timer.textContent = '...'
    let num = 5
    let interv = setInterval(() => {
        timer.textContent = num
        num --
    }, 1000)

    var maininterv 
    setTimeout(() => {
                maininterv = setInterval(() => {
                timer.textContent = null
                if(val == enemyval){
                    ShowResult("nobody won", val, enemyval)
                }
                else if((val == 1 && enemyval == 3) || (val == 2 && enemyval == 1) || (val == 3 && enemyval == 2)){
                    ShowResult("you won", val, enemyval)
                    setScore(true)
                }
                else if ((val == 1 && enemyval == 2) || (val == 2 && enemyval == 3) || (val == 3 && enemyval == 1)) {
                    ShowResult("you lose", val, enemyval)
                }
                else if(!val){
                    ShowResult("you lose", 0, enemyval)
                }
            clearInterval(interv)
            timer.textContent = null 
        },100)
    }, 4000)
    clearInterval(maininterv)
    setTimeout(() => {
        gameover.style.visibility = "visible"
    }, 7500)
    
}

window.onload = function(){
    PlaygroundSpawn()
}
