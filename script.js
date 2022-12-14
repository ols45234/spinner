var canvas = document.getElementById("canvas");
var canvaswidth = 512;
var canvasheight = 512;

canvas.width = canvaswidth;
canvas.height = canvasheight;
var ctx = canvas.getContext("2d");
var list = [
	{name: '1', color: 'red'},
	{name: '2', color: 'green'},
	{name: '3', color: 'blue'},
	{name: '5', color: 'yellow'},
	{name: '10', color: 'black'}]

var drawPizza = (cx, cy, r, start, end, color, text) => {
	e = Math.PI * (end * 2)
	s = Math.PI * (start * 2)
	//ctx.clearRect(0,0,500,500);
	ctx.fillStyle = color
	ctx.beginPath()

	ctx.moveTo(cx, cy)
	ctx.lineTo(Math.sin(s) * r + cx, Math.cos(s) * r + cy)

	ctx.arc(cx, cy, r, Math.PI / 2 - s, Math.PI / 2 - (e))

	ctx.moveTo(cx, cy)
	ctx.lineTo(Math.sin(e) * r + cx, Math.cos(e) * r + cy)
	
	ctx.fillText(text, Math.sin(s) * r + cx, Math.cos(s) * r + cy);

	ctx.stroke()
	ctx.fill()
	ctx.closePath()
}


ctx.fillStyle = '#FF0000'
//drawPizza(100, 100, 50, 0.25, 0.5)

var m, j, s;
function spin(iter, speed) {
	iter += speed;
	ctx.clearRect(0, 0, canvaswidth, canvasheight)
	m = 1 / list.length
	j = 0
	s = 0
	list.forEach((item, i, arr) => {
		//ctx.fillStyle = item.color;
		drawPizza(250, 250, 250, iter - j, iter - (j + m), item.color, item.name)
		
		j += m
	})
	//console.log(iter, speed)
	//if(iter < 0.5) return
	requestAnimationFrame(() => {spin(iter, speed*0.95)})
}
function startSpin() {
	spin(0, 0.5)
}

function addElement() {

}
//