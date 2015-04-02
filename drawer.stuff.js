// �摜�t�@�C���̐؂�o���ʒu�i�C���f�b�N�X�j���g����canvas�ւ̉摜�`��
stuff.drawer = {
	// �摜�t�@�C���̃C���f�b�N�X�u��ɂȂ�B
	// "�t�@�C����": {
	// 		"�`�b�v��" : {x: ??, y: ??, width: ??, height: ??},
	// 		...
	// }
	//
};
console.log("drawer.stuff.js!");

// �C���f�b�N�X�t�@�C���̃��[�h
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

// canvas�ւ̉摜�`��
stuff.drawer.draw = function (ctx, img, nickname, chipname, x, y) {
	var index = stuff.drawer[nickname][chipname];
	ctx.drawImage(img,
			index.x, index.y, index.width, index.height,
			x, y, index.width, index.height);
}

