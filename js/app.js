const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("distroy-btn");
const eraseBtn = document.getElementById("erase-btn");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");

const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");

const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width =CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX,event.offsetY);
}
function startPainting(){
    ctx.beginPath();
    isPainting =true;
}
function cancelPainting(){
    isPainting =false;
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(event){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    }else{
        isFilling = true;
        modeBtn.innerText = "Draw"
    }
}
function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraseClick(){
    ctx.strokeStyle="white";
    isFilling = false;

}

canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting); // 마우스 떠났을 경우에도 추가

canvas.addEventListener("click",onCanvasClick);
lineWidth.addEventListener("change",onLineWidthChange);
color.addEventListener("change",onColorChange);

colorOptions.forEach(color => color.addEventListener("click",onColorClick));

modeBtn.addEventListener("click",onModeClick);
destroyBtn.addEventListener("click",onDestroyClick);
eraseBtn.addEventListener("click",onEraseClick);