var canvas = document.getElementById("canvas");
var canvaswidth = 512;
var canvasheight = 512;

canvas.width = canvaswidth;
canvas.height = canvasheight;
var ctx = canvas.getContext("2d");
var list = [{ name: 'variant', color: '#69d000', random: true}]
var rot = 0;

var random = (min, max) => Math.random() * (max - min) + min

var drawPizza = (cx, cy, r, start, end, color, text) => {
	e = Math.PI * (end * 2)
	s = Math.PI * (start * 2)
	ctx.fillStyle = color
	ctx.beginPath()

	ctx.moveTo(cx, cy)
	ctx.lineTo(Math.sin(s) * r + cx, Math.cos(s) * r + cy)

	ctx.arc(cx, cy, r, Math.PI / 2 - s, Math.PI / 2 - (e))

	ctx.moveTo(cx, cy)
	ctx.lineTo(Math.sin(e) * r + cx, Math.cos(e) * r + cy)

	ctx.stroke()
	ctx.fill()
	ctx.closePath()

	ctx.beginPath()
	ctx.fillStyle = invertColor(color)

	ctx.save();
	ctx.translate(Math.sin((s + e) / 2) * (r - 50) + cx, Math.cos((s + e) / 2) * (r - 50) + cy);
	ctx.rotate((Math.PI / 2 - (s + e) / 2));
	ctx.textAlign = "center";
	ctx.font = ctx.font.replace(/\d+px/, "12px");
	ctx.fillText(text, 0, 0);
	ctx.restore();

	ctx.stroke()
	ctx.fill()
	ctx.closePath()
}


ctx.fillStyle = '#FF0000'

function spin(iter, speed, repeat) {
	iter += speed;
	if (iter >= 1) iter--;
	ctx.clearRect(0, 0, canvaswidth, canvasheight)
	updateWheel(iter);
	//console.log(iter, speed)
	if (speed < 0.00000001) {
		rot = iter;
		return
	}
	if (repeat)
		requestAnimationFrame(() => { spin(iter, speed * 0.93 - 0.00001, true) })
}
function startSpin() {
	spin(rot, random(0.3, 0.7), true)
}

function addElement() {
	list.push({ name: 'name', color: getColor('name'), random: true});
	updateList()
}

function changeName(id) {
	list[id].name = document.getElementById(`item-name-${id}`).value;
	if(list[id].random)
		list[id].color = getColor(list[id].name)
	updateList()
}

function changeColor(id) {
	list[id].color = document.getElementById(`item-color-${id}`).value;
	list[id].random = false;
	updateList()
}

function deleteItem(id) {
	list[id] = {};
	for (let i = id; i < list.length; i++) {
		list[i] = list[i + 1];
	}
	list.pop()
	updateList()
}

function updateList() {
	var mainDiv = document.getElementById('item-list-div')
	mainDiv.innerHTML = '<button type="button" id="item-list-addElement" onClick="addElement()" style="width: 100%">+</button>'
	list.forEach((item, i) => {
		let id = i;
		mainDiv.innerHTML += `<div id="item-div-${id}" style="display:flex">
		<input id="item-name-${id}" placeholder="текст" type="text" maxlength="10" onChange="changeName(${id})" value="${item?.name || ''}">
		<input id="item-color-${id}" placeholder="цвет" type="color" onChange="changeColor(${id})" value="${item?.color || '#000000'}">
		<button type="button" id="item-remove-${id}" onClick="deleteItem(${id})">-</button>`
	})
	updateWheel(rot);
}
function updateWheel(iter) {
	let m = 1 / list.length
	let j = 0
	let r = iter || 0
	list.forEach(item => {
		drawPizza(250, 250, 200, r - j, r - (j + m), item.color, item.name)
		j += m
	})

	ctx.beginPath();
	ctx.moveTo(440, 250);
	ctx.lineTo(500, 275);
	ctx.lineTo(500, 225);
	ctx.fillStyle = 'red'
	ctx.fill();
	ctx.closePath();
}

function invertColor(hex) {
	if (hex.indexOf('#') === 0) {
		hex = hex.slice(1);
	}
	// convert 3-digit hex to 6-digits.
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (hex.length !== 6) {
		throw new Error('Invalid HEX color.');
	}
	// invert color components
	var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
		g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
		b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
	// pad each with zeros and return
	return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
	len = len || 2;
	let zeros = new Array(len).join('0');
	return (zeros + str).slice(-len);
}

String.prototype.hashCode = function () {
	var hash = 0,
		i, chr;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

function getColor(text) {
	let hash = text.hashCode()
	hash ^= hash << 17
	hash ^= hash >> 7
	hash ^= hash << 2
	hash ^= hash >> 10

	//hash &= 16777215

	let r = ((hash & 255) >> 0).toString(16),
		g = ((hash & 65280) >> 8).toString(16),
		b = ((hash & 16711680) >> 16).toString(16);
	return '#' + padZero(r) + padZero(g) + padZero(b);
}

updateList();
//