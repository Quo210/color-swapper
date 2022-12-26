const body = document.querySelector('body')
const button = document.querySelector('button.activate')
const button2 = document.querySelector('button.loop')
const fastButton = document.querySelector('.faster')
const slowButton = document.querySelector('.slower')
const stopButton = document.querySelector('.stop')
const reportBox = document.querySelector('.message')


setNewColor()

function genHSL(hue,sat,lig){
    const base = `hsl(${hue}, ${sat}%, ${lig}%)`;
    return base
}

function hueGen(){
    return Math.floor(Math.random() * 255) + 1
}

function setNewColor(){
    const newCol = hueGen();
    const forBackground = genHSL(newCol,100,50);
    saveCurrentColor(forBackground)
    saveCurrentHue(newCol)
    body.setAttribute('style',`background-color: ${forBackground}`)
    button.setAttribute('style',`background-color: ${genHSL(newCol,50,75)}; border-color: ${genHSL(newCol,95,25)}`)
    button2.setAttribute('style',`background-color: ${genHSL(newCol,50,65)}; border-color: ${genHSL(newCol,95,25)}`)
    fastButton.setAttribute('style',`background-color: ${genHSL(newCol,50,55)}; border-color: ${genHSL(newCol,95,25)}`)
    slowButton.setAttribute('style',`background-color: ${genHSL(newCol,50,65)}; border-color: ${genHSL(newCol,95,25)}`)
}

function saveCurrentColor(string){
    sessionStorage.setItem('currentColor', string)
}

function saveCurrentHue(string){
    sessionStorage.setItem('currentHue', string)
}

function getCurrentColor(){
    return sessionStorage.getItem('currentColor')
}

function clearColorInterval(){
    clearInterval(sessionStorage.getItem('interval'))
}

function getCurrentSpeed(){
    return sessionStorage.getItem('intDuration')
}

function createInterval(last){
    const myInt = setInterval(setNewColor,last)
    sessionStorage.setItem('interval',myInt)
    sessionStorage.setItem('intDuration',last)
}

function reportBoxSays(string){
    reportBox.textContent = string
}

function reportCurrentColor(){
    const message = getCurrentColor();
    reportBoxSays(`The current color is ${message}`)
}

function reportCurrentSpeed(){
    const speed = getCurrentSpeed()
    const reduced = Math.round(speed * 1000 ) / 1000000;
    let timeUnit = '';
    (reduced != 1)? timeUnit = 'seconds' : timeUnit = 'second'; 
    reportBoxSays(`The current interval duration is ${reduced} ${timeUnit}`)
}

button.addEventListener('click', ()=>{
    clearColorInterval()
    setNewColor()
    reportCurrentColor()
})

button2.addEventListener('click',()=>{
    let intervalDuration = getCurrentSpeed();
    if (!intervalDuration){
        intervalDuration = 1000
    }
    clearColorInterval()
    createInterval(intervalDuration)
    reportCurrentSpeed()
})

fastButton.addEventListener('click',()=>{
    const lastOne = getCurrentSpeed();
    if (!lastOne){
        return 
    }
    clearColorInterval()
    createInterval(lastOne / 2)
    reportCurrentSpeed()
})

slowButton.addEventListener('click',()=>{
    const lastOne = getCurrentSpeed();
    if (!lastOne){
        return 
    }
    clearColorInterval()
    createInterval(lastOne * 2)
    reportCurrentSpeed()
})

stopButton.addEventListener('click',()=>{
    clearColorInterval()
    reportCurrentColor()
})