function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function watch() {
	console.log('Switching game...')
	vods =document.getElementsByClassName('item vods')[0];
	vods.click();

	await sleep(5000);
	console.log('Going to vods...')
	games = document.getElementsByClassName('game');

	for (i = 0; i < games.length; i++) {
	  if (!games[i].className.includes('watched') && !games[i].className.includes('not-played')) {games[i].click();break}
	}

	console.log('Clicking game...')
	await sleep(5000);
}

function jumptostart() {
	document.getElementsByClassName('text')[0].click();
}

watch()
setInterval(watch, 1000*60*5);
setInterval(jumptostart, 1000*2);
