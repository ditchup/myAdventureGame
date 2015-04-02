"use strict"
console.log("core2.stuff.js!");
// スクリプトおよび画像のロード機能
// load scripts and images

// 名前空間 
if (stuff === undefined) {
	var stuff = {
	};
} else {
	console.log("variable name 'stuff' is already used");
}

// stuff.jsファイルのロードを行う
stuff.sprout = function sprout(libname) {
	// ロード済みかのチェック
	if (stuff[libname] !== undefined && stuff[libname] !== null) {
		return;
	}

	var head = document.getElementsByTagName("head")[0];
	
	var s = document.createElement("script");
	s.src = libname + ".stuff.js";
	
	head.appendChild(s);
	
	return s;
};

// 任意のjsスクリプトのロードを行う
stuff.load = function (scriptPath) {
	var head = document.getElementsByTagName("head")[0];
	var s = document.createElement("script");
	
	s.src = scriptPath
	
	head.appendChild(s);
	
	return s;
};

stuff.imagebank = {};
stuff.imagebank.images = {};
console.log("created stuff.imagebank")

// 画像ファイルをロードし、img要素に割り当てる。
// アクセス用の文字列をキー、ファイルパスを値として持つオブジェクトを受け取る
stuff.imagebank.load = function (imgfile_indexes) {
	var img, key;
	for (key in imgfile_indexes) {
		img = new Image();
		img.src = imgfile_indexes[key];
		stuff.imagebank.images[key] = img;
	}

	return stuff.imagebank.images;
};


// JavaScript 6版 p349より
/*
function loadasync(url) {
	var head = document.getElementsByTagName("head")[0];
	var s = document.createElement("script");
	s.src = url;
	head.appendChild(s);
	
}
*/

//TODO ・・・追加ライブラリまでまとめて1つのファイルとして出力する（文字列を作る）functionの文字列化で何とか？

