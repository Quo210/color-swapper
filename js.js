const body = document.querySelector('body')
const button = document.querySelector('button.activate')
const button2 = document.querySelector('button.loop')


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

button.addEventListener('click', ()=>{
    clearColorInterval()
    setNewColor()
})

button2.addEventListener('click',()=>{
    clearColorInterval()
    const myInt = setInterval(setNewColor,1000)
    sessionStorage.setItem('interval',myInt)
    console.log(sessionStorage.getItem('interval'))
})