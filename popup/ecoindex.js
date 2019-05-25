 

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 *
 * @author didierfred@gmail.com
 * @version 0.1
 */


var started = "off";

window.onload = function() {
	document.getElementById('view_results').addEventListener('click',function (e) {view_results();});
	document.getElementById('start_stop').addEventListener('click',function (e) {start_analyse();});
	document.getElementById('view_history').addEventListener('click',function (e) {view_history();});
	started = localStorage.getItem("started");
	if (started=="on") setButtonText(browser.i18n.getMessage("stopButton"));	
} ;



function start_analyse()
	{
	var message = {status:"on"};
	if (started=="off") 
		{
		localStorage.setItem("started","on");
		started = "on";
		//document.getElementById("start_stop").value = "Stop";		
		setButtonText(browser.i18n.getMessage("stopButton"));
		}
	else 
		{
		localStorage.setItem("started","off");
		started = "off";
		setButtonText(browser.i18n.getMessage("startButton"));
		//document.getElementById("start_stop").value = "Start";
		message = {status:"off"};
		}
	browser.runtime.sendMessage(JSON.stringify(message));
	}


function setButtonText(text)
{
	const doc = document.getElementById("start_stop");
	doc.removeChild(doc.firstChild);
	doc.appendChild(document.createTextNode(text));
}



function view_results()
	{
	var myf = document.getElementById("results");
	myf.src="results.html";

	}

function view_history()
	{
	var promise_tabs =  browser.tabs.query({currentWindow: true});
	promise_tabs.then(loadHistoryTab);
	}
	
	
function loadHistoryTab(tabs)
{
	var history_tab;
	for (let tab of tabs) 
		{
		console.log(tab.url);
		if (tab.url.startsWith(browser.extension.getURL(""))) history_tab = tab;
		}
    if (history_tab) 
		{
		console.log("history tab exist")
		browser.tabs.reload(history_tab.id);
		browser.tabs.update(history_tab.id,{active:true})
		}
	else	
		{
		browser.tabs.create({url:"history.html"});
		console.log("no history tab")
		}
		

}

