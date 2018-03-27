 

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
	browser.runtime.sendMessage(JSON.stringify(message));
	}

function view_results()
	{
	var myf = document.getElementById("results");
	myf.src="results.html";

	}
