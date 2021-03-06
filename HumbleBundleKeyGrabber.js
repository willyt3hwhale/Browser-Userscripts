// ==UserScript==
// @name         Humble Bundle Key Grabber
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Returns a list of the keys a user is eligible to redeem. Ish.
// @author       Willy
// @match        https://www.humblebundle.com/home/keys
// @grant        none
// ==/UserScript==

function show_all() {
    for(let key of document.getElementsByClassName("keyfield-value"))
    {
        if(key.innerText == 'Reveal your Steam key')
        {
            key.click();
            setTimeout(show_all, 100);
            return;
        }
    }
}

function get_keys() {
	let keys = "";
    for (let key of document.getElementsByClassName("keyfield-value"))
    {
        if(key.innerText != 'Reveal your Steam key' && key.innerText != 'Claim to Uplay account')
        {
            keys = keys + key.innerText + "\n";
        }
    }
    if(keys.length > 0)
    {
        prompt("Keys:", keys);
    }
    else
    {
        if(confirm('No keys detected, are they hidden? (click on "Reveal your Steam key").\nShould we try to show them?'))
        {
            show_all()
        }
    }
}

document.getElementsByClassName('hide-redeemed-label')[0].insertAdjacentHTML('afterend', '&nbsp;<button type="button" id="show-all-button">Show all keys!</button>')


document.getElementById('show-all-button').addEventListener('click', show_all, false);

document.getElementsByClassName('hide-redeemed-label')[0].insertAdjacentHTML('afterend', '&nbsp;&nbsp;<button type="button" id="get-keys-button">Get keys!</button>')


document.getElementById('get-keys-button').addEventListener('click', get_keys, false);
