const body = document.querySelector('body')
const button = document.querySelector('button.activate')
const button2 = document.querySelector('button.loop')
const fastButton = document.querySelector('.faster')
const slowButton = document.querySelector('.slower')
const stopButton = document.querySelector('.stop')


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
    body.setAttribute('style',`background-color: ${forBackground}`)
    button.setAttribute('style',`background-color: ${genHSL(newCol,50,75)}; border-color: ${genHSL(newCol,95,25)}`)
    button2.setAttribute('style',`background-color: ${genHSL(newCol,50,65)}; border-color: ${genHSL(newCol,95,25)}`)
    fastButton.setAttribute('style',`background-color: ${genHSL(newCol,50,55)}; border-color: ${genHSL(newCol,95,25)}`)
    slowButton.setAttribute('style',`background-color: ${genHSL(newCol,50,65)}; border-color: ${genHSL(newCol,95,25)}`)
}

function saveCurrentColor(string){
    sessionStorage.setItem('currentColor',string)
}

function getCurrentColor(){
    sessionStorage.getItem('currentColor')
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

function reportCurrentColor(){

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

stopButton.addEventListener('click',()=>{
    clearColorInterval()
})