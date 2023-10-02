export const info = document.querySelector('.info')
const modal = document.querySelector('.modal-wrapper')
const input = document.querySelector('.guess-input')
const attempts = document.querySelector('.current-attempts')
const diffSelector = document.querySelector('.diff')

let num = 0
let attemptCounter = 0
let win = false

// Начало игры
export function startGame() {
    const currentDifficulty = document.querySelector('.current-diff')
    randomNumber()
    modal.style.display = `none`
    switch (diffSelector.value) {
        case '100':
            currentDifficulty.innerText = `1 - 100`
            break;
        case '1000':
            currentDifficulty.innerText = `1 - 1000`
            break;
        case '10000':
            currentDifficulty.innerText = `1 - 10000`
            break;
    }
}

export function checkNumber() {
    if (!win) {
        input.disabled = false
        // Если число в диапозоне лимита
        if (+input.value <= +diffSelector.value) {
            attemptCounter++
            attempts.innerText = attemptCounter

            // Проверка правил
            if (input.value <= 0) {
                const p = document.createElement('p')
                p.classList.add('offlimit', 'easeIn')
                p.innerText = `Введенное число за пределами установленного лимита`
                info.append(p)
            } else if (input.value > num) {
                const p = document.createElement('p')
                p.classList.add('try-less', 'easeIn')
                p.innerText = `Загаданное число меньше ${input.value}`
                info.append(p)
            } else if (input.value < num) {
                const p = document.createElement('p')
                p.classList.add('try-more', 'easeIn')
                p.innerText = `Загаданное число больше ${input.value}`
                p.style.opacity = 1
                info.append(p)
            } else if (+input.value === +num) {
                const p = document.createElement('p')
                p.classList.add('hit', 'easeIn')
                p.innerText = `Вы выиграли! Загаданное число: ${num}`

                info.append(p)
                win = true
                input.disabled = true
            }
            // Подсказка при 3 попытках
            if (attemptCounter === 3) {
                let result
                if (num % 2 === 0) {
                    result = `чётное`
                } else result = `не чётное`

                const p = document.createElement('p')
                p.classList.add('hint', 'easeIn')
                p.innerText = `Загаданное число ${result}`
                info.append(p)
            }
            input.value = ``
        }
        // Если число вне диапозона 
        else if (+input.value > +diffSelector.value) {
            const p = document.createElement('p')
            p.classList.add('offlimit', 'easeIn')
            p.innerText = `Введенное число за пределами установленного лимита`
            info.append(p)
        }
    }
}

// Сброс переменных
export function restart() {
    attemptCounter = 0
    attempts.innerText = attemptCounter
    info.innerHTML = ``
    modal.style.display = `flex`
    input.disabled = false
    win = false
}

// функция для загадывания числа
function randomNumber() {
    num = Math.floor(Math.random() * diffSelector.value) + 1
}