"use strict"
console.log("easycanvas.stuff.js!");

if (stuff.easycanvas === undefined) {
	stuff.easycanvas = {};
} else {
	console.log("'stuff.easycanvas' is already exist");
}

stuff.easycanvas.setup = function (width, height, visibleframe) {
	var elem = document.createElement("canvas");
	elem.height = height;
	elem.width = width;
	document.body.appendChild(elem);
	
	// 画面左端に移動
	// tmlib tm.graphics.CanvasのresizeWindowを参考に
	elem.style.position = "absolute"; // fixed? 入れられたとこで適当な場所に・・・
	elem.style.left = 0;
	elem.style.top = 0;
	
	var ctx = elem.getContext("2d");
	
	if (visibleframe === true) {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, width, height);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, width, height);
	}
	
	return ctx;
};

