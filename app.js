const http = require('http');

const PORT = 3000;

http.createServer((req, res) => {
	res.write('On the way to becoming a fullsnack engineer');
	res.end();
}).listen(PORT);

console.log(`Server started on ${PORT}`);
