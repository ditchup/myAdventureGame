// 画像ファイルの切り出し位置（インデックス）を使ったcanvasへの画像描画
stuff.drawer = {
	// 画像ファイルのインデックス置場になる。
	// "ファイル名": {
	// 		"チップ名" : {x: ??, y: ??, width: ??, height: ??},
	// 		...
	// }
	//
};
console.log("drawer.stuff.js!");

// インデックスファイルのロード
stuff.drawer.setIndex = function (filedir, filename, nickname) {
	var elem = stuff.sprout(filedir + "/" + filename + ".drawer");

	if (nickname !== undefined) {
		elem.onload = function () {
			stuff.drawer[nickname] = stuff.drawer[filename];
			console.log(filename);
			delete stuff.drawer[filename];
		};
	}
};

// canvasへの画像描画
stuff.drawer.draw = function (ctx, img, nickname, chipname, x, y) {
	var index = stuff.drawer[nickname][chipname];
	ctx.drawImage(img,
			index.x, index.y, index.width, index.height,
			x, y, index.width, index.height);
}

