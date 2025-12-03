import JBA from 'jba';
import express from 'express';

const PORT = 3000;

const index = {};

index.html = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>JBA - Browser</title>
	<style>
		body { font-family: sans-serif; margin: 2rem; }
	</style>
	<script type="importmap">
		{
			"imports": {
				"jba": "./lib/index.js",
				"jba/types/function": "./lib/types/function.js"
			}
		}
	</script>
</head>
<body>
	<h1>Open Console</h1>
	<button>Generate Data and send it to the server</button>
	<script type="module">
		import JBA from 'jba';
		import '/examples/index.js';

		const button = document.querySelector('button');
		button.addEventListener('click', () => {
			const str = 'Lorem Ipsum '.repeat(10);
			const numArray = [];
			for (let i = 0; i < 100; i += 1) {
				numArray.push(i);
			}
			const data = { str, numArray, date: new Date(), foo: undefined, bar: Infinity };
			const encoded = JBA.encode(data);
			fetch('/test', { method: 'post', body: encoded });
		});
	</script>
</body>
</html>
`;

const server = express();

server.use((req, res, next) => {
	console.log(
		(new Date()).toISOString().replace('T', ' ').slice(0, 19),
		req.method,
		req.path,
	);
	next();
});

server.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.send(index.html);
});

server.post('/test', async (req, res) => {
	const chunks = [];
	for await (const chunk of req) {
		chunks.push(chunk);
	}
	const buffer = Buffer.concat(chunks);

	const data = JBA.decode(buffer);

	console.log('Incoming Data:');
	console.log(data);

	return res.end();
});

server.use('/lib', express.static(`${import.meta.dirname}/../../lib`));

server.use('/examples', express.static(`${import.meta.dirname}/..`));

server.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Open http://localhost:${PORT}`);
});
