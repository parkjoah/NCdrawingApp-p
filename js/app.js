const canvas = document.querySelector("canvas");

const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");

const ctx = canvas.getContext("2d");
canvas.width =800;
canvas.height=800;

ctx.lineWidth = lineWidth.value;

let isPainting = false;
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

canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting); // 마우스 떠났을 경우에도 추가

lineWidth.addEventListener("change",onLineWidthChange);
color.addEventListener("change",onColorChange);

