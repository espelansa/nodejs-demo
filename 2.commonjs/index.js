// 石头剪刀布游戏
const game = require('./lib')

let count = 0;

process.stdin.on('data', e => {
	const playerAction = e.toString().trim()
	const result = game(playerAction)
	console.log(result)

	if (result < 0) {
		count++;
	}
	if (count === 3) {
		console.log('你太厉害了，我不玩了')
		process.exit();
	}
})