const body = document.querySelector('body')
const button = document.querySelector('button.activate')
const button2 = document.querySelector('button.loop')
const fastButton = document.querySelector('.faster')
const slowButton = document.querySelector('.slower')


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
    body.setAttribute('style',`background-color: ${genHSL(newCol,100,50)}`)
    button.setAttribute('style',`background-color: ${genHSL(newCol,50,75)}; border-color: ${genHSL(newCol,95,25)}`)
    button2.setAttribute('style',`background-color: ${genHSL(newCol,50,65)}; border-color: ${genHSL(newCol,95,25)}`)
}

function clearColorInterval(){
    clearInterval(sessionStorage.getItem('interval'))
}

function getLastInterval(){
    return sessionStorage.getItem('intDuration')
}

function createInterval(last){
    const myInt = setInterval(setNewColor,last)
    sessionStorage.setItem('interval',myInt)
    sessionStorage.setItem('intDuration',last)
}

button.addEventListener('click', ()=>{
    clearColorInterval()
    setNewColor()
})

button2.addEventListener('click',()=>{
    let intervalDuration = getLastInterval();
    if (!intervalDuration){
        intervalDuration = 1000
    }
    clearColorInterval()
    createInterval(intervalDuration)
    console.log(sessionStorage.getItem('interval'))
})

fastButton.addEventListener('click',()=>{
    const lastOne = getLastInterval();
    if (!lastOne){
        return 
    }
    clearColorInterval()
    createInterval(lastOne / 2)
})

slowButton.addEventListener('click',()=>{
    const lastOne = getLastInterval();
    if (!lastOne){
        return 
    }
    clearColorInterval()
    createInterval(lastOne * 2)
})