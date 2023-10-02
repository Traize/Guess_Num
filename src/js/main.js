import { checkNumber, info, restart, startGame } from "./gameplay.js"




const playWindow = document.querySelector('.content-window')

const startBtn = document.querySelector('.start')
const retryBtn = document.querySelector('.retry')




startBtn.onclick = () => startGame()
retryBtn.onclick = () => restart()




// Основная логика игры
playWindow.onsubmit = (e) => {
    e.preventDefault()
    checkNumber()
    info.scrollTop = info.scrollHeight
}


