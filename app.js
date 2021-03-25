const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const dandyDimension = {width: 105.4, height: 105.4}

canvas.width = window.innerWidth
canvas.height = window.innerHeight
context.translate(window.innerWidth/2, window.innerHeight/2)

const loopingDandy = 40
const offsetDistance = 70
let currentOffset = 0

const movementRange = 200

const mouseOffset = {
  x: 0,
  y: 0
}

const movementOffset = {
  x: 0,
  y: 0
}

const image = new Image()
image.src = './dandy.png'

image.onload = () => {
    startLooping()
}

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.setTransform(1, 0, 0, 1, 0, 0); //Reset the canvas context
    context.translate(window.innerWidth / 2, window.innerHeight / 2);
  };
  
  window.addEventListener('mousemove', onMouseMove)

function draw(offset, loopCount) {
    let currentPercentage = (loopingDandy - loopCount) / loopingDandy
    context.drawImage(
        image,
        -dandyDimension.width/2 - offset/2 + (movementOffset.x * currentPercentage),
        -dandyDimension.height/2 - offset/2 + (movementOffset.y * currentPercentage),
        dandyDimension.width + offset,
        dandyDimension.height + offset
        )
}

function onMouseMove(e) {
    mouseOffset.x = (e.clientX - window.innerWidth / 2) / window.innerWidth / 2 * movementRange
    mouseOffset.y = (e.clientY - window.innerHeight / 2) / window.innerHeight / 2 * movementRange
}

function lerp(start, end, amount) {
    return start*(1-amount)+end*amount
}

function loopDraw() {
    movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.1)
    movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.1)
    
    for(let i = loopingDandy; i >= 0; i--) {
        draw(i * offsetDistance + currentOffset, i)
    }

    draw(offsetDistance, 1)

    currentOffset++

    if(currentOffset >= offsetDistance) {
        currentOffset = 0
    }
    
    requestAnimationFrame(loopDraw)
}

function startLooping() {
    requestAnimationFrame(loopDraw)
}