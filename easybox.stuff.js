"use strict"
console.log("easybox.stuff.js!");
stuff.easybox = {};

//div要素の作成、bodyへの追加
stuff.easybox.setup = function (width, height, color) {
	var elem = document.createElement("div");
	document.body.appendChild(elem);
	
	elem.style.height = height;
	elem.style.width = width;
	elem.style.backgroundColor = color;
	
	// 画面左端に移動
	// tmlib tm.graphics.CanvasのresizeWindowを参考に
	//TODO dom.moveに入れた方がいい？
	elem.style.position = "absolute"; // fixed? 入れられたとこで適当な場所に・・・
	elem.style.left = 0;
	elem.style.top = 0;

	return elem;
};

