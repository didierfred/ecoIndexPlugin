
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 *
 * @author didierfred@gmail.com
 * @version 0.2
 */


"use strict";


var nb_request=0;
var byte_total = 0;

localStorage.setItem('started',"off");

// listen for start/stop and results
browser.runtime.onMessage.addListener(notify);



/*
* Count the number of request
*
*/
function countRequest(e) 
{
nb_request++;
}

function mesureSize(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);


  //filter.onstart = event => {
  //  console.log("started ");
  //}
 
  filter.ondata = event => {
    //console.log(event.data);
    byte_total = byte_total + event.data.byteLength;
    filter.write(event.data);
  }

  filter.onstop = event => {
    //console.log("finished");
    filter.disconnect();
  }

  return {};
}

/*
* Listen for message form menu.js
* if message is on : start the record 
* if message is off : stop the record
*
**/
function notify(message) 
	{
	var json_message = JSON.parse(message);
	if (json_message.status=="off")
		{
		removeListener();
		browser.browserAction.setIcon({ path: "icons/modify-32.png"});
		console.log("Stop the analyse : nb_request="+ nb_request);
		console.log("Stop the analyse : byte_total="+ byte_total);
		localStorage.setItem('nb_request',nb_request);
		localStorage.setItem('byte_total',byte_total);
		browser.tabs.executeScript({
					file: "dom_size.js"
					});
		return;
		}

	if (json_message.status=="on")
		{
		addListener();
		browser.browserAction.setIcon({ path: "icons/modify-green-32.png"});
		nb_request=0;
		byte_total = 0;
		console.log("Start the analyse");
		return 	
		}
	if (json_message.dom_size)
		{
	    console.log("Dom Size received: "+ json_message.dom_size);
		localStorage.setItem("dom_size",json_message.dom_size);
		}
  	}

/*

*/
function addListener()
	{
	var target ="<all_urls>";
	
	browser.webRequest.onBeforeRequest.addListener(countRequest,
                                          {urls: [target]});

	browser.webRequest.onBeforeRequest.addListener(
									mesureSize,
									{urls: [target]},
									["blocking"]
									);
// for debug only
//	browser.webRequest.onCompleted.addListener(log_headers,
//                                          {urls: [target]},
//                                          ["responseHeaders"]);
	}




/*
* Remove the two listener 
*
*/
function removeListener()
	{
	browser.webRequest.onBeforeRequest.removeListener(countRequest);
	browser.webRequest.onBeforeRequest.removeListener(mesureSize);

	}


