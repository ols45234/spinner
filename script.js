var canvas = document.getElementById("canvas");
var canvaswidth = 1024;
var canvasheight = 512;

canvas.width = canvaswidth;
canvas.height = canvasheight;
var ctx = canvas.getContext("2d");
var list = ['1', '2', '3', '5', '10']
var colors = ['red', 'green', 'blue', 'yellow', 'black']

var drawPizza = (cx, cy, r, start, end, text) => {
	e = Math.PI * (end * 2)
	s = Math.PI * (start * 2)
	//ctx.clearRect(0,0,500,500);
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

var m = 1 / list.length
var j = 0
var s = 0
async function spin(iter) {
	ctx.clearRect(0, 0, canvaswidth, canvasheight)
	list.forEach((item, i, arr) => {
		ctx.fillStyle = colors[i]
		drawPizza(250, 250, 250, iter + (-j), iter + (-(j + m)), list[i])
		console.log(j, j + m, i)
		j += m
	})
	setTimeout(() => { spin(Math.pow(iter, 0.99)) }, 10)
}
//