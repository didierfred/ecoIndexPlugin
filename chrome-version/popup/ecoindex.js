 

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
	if (started=="on") document.getElementById("start_stop").value = "Stop";	
} ;



function start_analyse()
	{
	var message = {status:"on"};
	if (started=="off") 
		{
		localStorage.setItem("started","on");
		started = "on";
		document.getElementById("start_stop").value = "Stop";		
		}
	else 
		{
		localStorage.setItem("started","off");
		started = "off";
		document.getElementById("start_stop").value = "Start";
		message = {status:"off"};
		}
	chrome.runtime.sendMessage(JSON.stringify(message));
	}

function view_results()
	{
	var myf = document.getElementById("results");
	myf.src="results.html";

	}

function view_history()
	{
	chrome.tabs.query({currentWindow: true},
	loadHistoryTab);
	}
	
	
function loadHistoryTab(tabs)
{
	var history_tab;
	for (let tab of tabs) 
		{
		console.log(tab.url);
		if (tab.url.startsWith(chrome.extension.getURL(""))) history_tab = tab;
		}
    if (history_tab) 
		{
		console.log("history tab exist")
		chrome.tabs.reload(history_tab.id);
		chrome.tabs.update(history_tab.id,{active:true})
		}
	else	
		{
		chrome.tabs.create({url:"popup/history.html"});
		console.log("no history tab")
		}
		

}

