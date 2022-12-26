const body = document.querySelector('body')
const button = document.querySelector('button.activate')
const button2 = document.querySelector('button.loop')


body.setAttribute('style',`background-color: ${genHSL(hueGen(),100,50)}`)

function genHSL(hue,sat,lig){
    const base = `hsl(${hue}, ${sat}%, ${lig}%)`;
    return base
}

function hueGen(){
    return Math.floor(Math.random() * 255) + 1
}

function setNewColor(){
    body.setAttribute('style',`background-color: ${genHSL(hueGen(),100,50)}`)
}

button.addEventListener('click', ()=>{
    clearInterval(sessionStorage.getItem('interval'))
    setNewColor()
})

button2.addEventListener('click',()=>{
    const myInt = setInterval(setNewColor,1000)
    sessionStorage.setItem('interval',myInt)
    console.log(sessionStorage.getItem('interval'))
})