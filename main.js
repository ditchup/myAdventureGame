// enchant.js, tmlib.js, require.jsを参考にしています。
//
// ゲーム中で使用しているDenzi150205-2.pngはDenzi様（http://profile.hatena.ne.jp/Denzi/）が作成されました。

// サブライブラリのロード
var sprout = stuff.sprout;
sprout("easycanvas");//.onload = function () {console.log("easycanvas onload")};
sprout("dom");
//sprout("easybox");
//sprout("imagebank");
/*
sprout("drawer").onload = function () {
	stuff.drawer.setIndex("images_made_by_DENZI", "Denzi150205-2.png", "monsters");
	//stuff.drawer.setIndex("images_made_by_DENZI", "Denzi150205-2.png");
	// imagebanckとくっつける？
};
*/

// いつでもアクセスしたい定数
var P = {
	GAMEWIDTH: 288,
	GAMEHEIGHT: 288,
};

// 画像の読み込み 
// 引数はプログラム中での呼び方とファイルパス
stuff.imagebank.load({
	"edges": "img/edge_face.png",
	//"monsters": "images_made_by_DENZI/Denzi150205-2.png",
	"desk": "img/desk.png",
});
var images = stuff.imagebank.images;

// ゲーム実行中にオブジェクトにアクセスするためのグローバル変数。
// 見たいオブジェクトをここに登録する。
var debug = {};
debug.reset = function () {
	location.reload();
}

var prepare = function () {
	console.log("window onload");
	document.body.style.backgroundColor = "black";

	// グラフィック用canvas要素作成
	var ctx = stuff.easycanvas.setup(P.GAMEWIDTH, 180);
	var canvas = ctx.canvas;
	stuff.dom.move(canvas, 16, 16);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// テキスト欄用canvas要素作成
	var textctx = stuff.easycanvas.setup(P.GAMEWIDTH, P.GAMEHEIGHT-canvas.height-8, true);
	var textcanvas = textctx.canvas;
	stuff.dom.move(textcanvas, 16, 16+canvas.height+8);
	textctx.fillStyle = "black";
	textctx.fillRect(0, 0, canvas.width, canvas.height);

	debug.textctx = textctx;

	textctx.simplePrint = function (text) {
		textctx.fillStyle = "black";
		textctx.fillRect(6, 6, textcanvas.width-12, textcanvas.height-12);
		textctx.fillStyle = "white";
		textctx.fillText(text, 26, textcanvas.height/2);
	};
	//textctx.simplePrint("face is smiling.");

	textctx.scrollPrint = function (text) {
		var scrollheight = 10;
		textctx.drawImage(textcanvas,
				6, 6 + scrollheight, textcanvas.width-12, textcanvas.height-12-scrollheight,
				6, 6, textcanvas.width-12, textcanvas.height-12-scrollheight);
		textctx.fillStyle = "black";
		textctx.fillRect(6, textcanvas.height-6-scrollheight, textcanvas.width-12, scrollheight);
		textctx.fillStyle = "white";
		textctx.fillText(text, 26, textcanvas.height-6-scrollheight);
	};
	
	/*
	canvas.addEventListener("mousemove", function (e) {
		ctx.fillStyle = P.WHITECOLOR;
		ctx.fillRect(Math.floor(e.layerX), Math.floor(e.layerY), 10, 10);
		// layerX: イベント登録された要素左上を基点とする。
		// clientX, x: HTML左上を基点、screenX: PC画面左上を基点
	})
	*/

	// 土台作り

	var drawWakuRich = function (ctx) {
		var canvas = ctx.canvas;
		// edge_face.png専用
		// 画像左半分に16*16チップが8枚
		// 左上4つは角の画像
		// 左下4つは「辺」の画像
		var img = images["edges"];
		var x, y;
		for (x = 16; x < canvas.width - 16; x += 16) {
			ctx.drawImage(img, 0, 32, 16, 16, x, 0, 16, 16);
		}
		for (x = 16; x < canvas.width - 16; x += 16) {
			ctx.drawImage(img, 16, 48, 16, 16, x, canvas.height-16, 16, 16);
		}
		for (y = 16; y < canvas.height-16; y += 16) {
			ctx.drawImage(img, 16, 32, 16, 16, 0, y, 16, 16);
		}
		for (y = 16; y < canvas.height-16; y += 16) {
			ctx.drawImage(img, 0, 48, 16, 16, canvas.width-16, y, 16, 16);
		}
		ctx.drawImage(img, 0, 0, 16, 16, 0, 0, 16, 16);
		ctx.drawImage(img, 16, 0, 16, 16, canvas.width-16, 0, 16, 16);
		ctx.drawImage(img, 0, 16, 16, 16, 0, canvas.height-16, 16, 16);
		ctx.drawImage(img, 16, 16, 16, 16, canvas.width-16, canvas.height-16, 16, 16);
	}

	// 角が立ってるのは嫌だ。
	// チープすぎる。
	var drawWaku = function(ctx, color) {
		var size = 6;
		var canvas = ctx.canvas;
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, canvas.width, size);
		ctx.fillRect(0, canvas.height-size, canvas.width, size);
		ctx.fillRect(0, size, size, canvas.height - 2*size);
		ctx.fillRect(canvas.width-size, size, size, canvas.height - 2*size);
	}

	var fillHorizon = function (ctx, x, y, width, color) {
		if (color !== undefined) {
			ctx.fillStyle = color;
		}
		ctx.fillRect(x, y, width, 1);
	};
	var fillVertical = function (ctx, x, y, height, color) {
		if (color !== undefined) {
			ctx.fillStyle = color;
		}
		ctx.fillRect(x, y, 1, height);
	};

	var drawGrid = function (ctx, start_x, start_y, width, height, dw, dh, color) {
		if (color !== undefined) {
			ctx.fillStyle = color;
		}
		
		var x, y
		for (x = start_x ; x < start_x + width; x += dw) {
			fillVertical(ctx, x, start_y, height, color);
		}
		for (y = start_y ; y < start_y + height; y += dh) {
			fillHorizon(ctx, start_x, y, width, color);
		}
	};

	//TODO 工夫する。
	drawWakuRich(ctx, "white");
	drawWaku(textctx, "#cccccc");

	drawGrid(ctx, 16, 16, ctx.canvas.width-32, ctx.canvas.height-32, 4, 4, "#222244");

	// 画面表示単位（room）の親。アクセス可能にする。
	// 要らない？
	var house = {};

	// 部屋。
	// 画面に表示される画像、タッチに反応するイベントの入れ物。
	// gs: 画面上に表示する画像群
	// es: タッチに反応するイベント群
	// onenter: そのroomに入った時に実行するコールバック
	house.room1 = {
		// graphs, events
		gs: {}, es:{}, onenter: null,
	}
	// 画像、イベントの定義
	house.room1.gs["face"] = {
		x: 20, y: 40, width: 32, height: 16,
		visible: true,
		image: images["edges"],
		sx: 32, sy: 32
	};
	house.room1.gs["desk"] = {
		x: 94, y: 110, width: 33, height: 33,
		visible: true,
		image: images["desk"],
	};
	house.room1.es["face"] = {
		target: house.room1.gs["face"],
		touchable: true,
		callback: function () {
			//house.room1.gs["face"].visible = false;
			//house.room1.es["face"].touchable = false;
			var graph = house.room1.gs["face"];
			if (graph.sy === 32) {
				graph.sy = 48; 
				textctx.scrollPrint("face is burned.");
			} else {
				graph.sy = 32; 
				textctx.scrollPrint("face is smiling.");
				//stuff.drawer.draw(ctx, images["monsters"], "monsters", "skeleton", 100, 40);
			}

		}
	};

	// 現在どの部屋にいるのか
	var room = house.room1; // enchant.jsのcurrentScene。

	// 別の部屋への移動
	// まだ使い方考えてない
	var moveRoom = function (dstroom) {
		room = dstroom;

		if (dstroom.onenter) {
			dstroom.onenter();
		}
	}


	// 再描画
	// 変数roomに登録された部屋の画像だけを描画する
	// ・必要最低限消す
	// 状態増やせないなら、配列に集める？
	// ・背景を描画してみる
	// ・背景で上書きして消す
	var redraw = function (allclear) {
		var gkey;

		// 全部消す。
		// できれば部分削除に（）
		if (allclear) {
			ctx.fillStyle = "black";
			ctx.fillRect(16, 16, canvas.width - 32, canvas.height - 32);
		}
		// シーン用描画（壁とか、床とか）

		// visible true -> falseになった時だけ消す？
		for (gkey in room.gs) {
			if (room.gs[gkey].visible) {
				var graph = room.gs[gkey];
				if (graph.sx) {
					ctx.drawImage(graph.image,
						graph.sx, graph.sy, graph.width, graph.height,
						graph.x, graph.y, graph.width, graph.height
					);// imagesに切り抜いた画像を入れるようにする？
				} else {
					ctx.drawImage(graph.image,
						graph.x, graph.y, graph.width, graph.height);
				}
			}
		}

	}

	// 画面へのタッチに反応するようにする
	// enchant.jsを参考に、Scene制を利用
	canvas.addEventListener("mouseup", function (e) {
		var x = e.layerX, y = e.layerY;
		var ekey; //BAD esじゃ何の集まりなのかよくわからない
		var ischanged = false;
		for (ekey in room.es) {
			if (room.es[ekey].touchable) {
				// ダックタイピング？
				var hitrect = room.es[ekey].target;
				if (x >= hitrect.x && x < hitrect.x + hitrect.width
				&& y >= hitrect.y && y < hitrect.y + hitrect.height) {
					room.es[ekey].callback();
					ischanged = true;
				}
			}
		}
		if (ischanged) {
			// 再描画のヒント渡せないだろうか。
			redraw();
		}

		// 伝播防止
		if (e.stopPropagation) {
			e.stopPropagation();
		}
	});
	redraw();
	//textctx.simplePrint("face is smiling.");
	textctx.scrollPrint("scroll");
	textctx.scrollPrint("scroll");
	textctx.scrollPrint("scroll");
	textctx.scrollPrint("scroll");
};


window.onload = prepare;
