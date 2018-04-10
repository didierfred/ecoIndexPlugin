
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

var quantiles_dom = [0, 47, 75, 159, 233, 298, 358, 417, 476, 537, 603, 674, 753, 843, 949, 1076, 1237, 1459, 1801, 2479, 594601];
var quantiles_req = [0, 2, 15, 25, 34, 42, 49, 56, 63, 70, 78, 86, 95, 105, 117, 130, 147, 170, 205, 281, 3920];
var quantiles_size = [0, 1.37, 144.7, 319.53, 479.46, 631.97, 783.38, 937.91, 1098.62, 1265.47, 1448.32, 1648.27, 1876.08, 2142.06, 2465.37, 2866.31, 3401.59, 4155.73, 5400.08, 8037.54, 223212.26];
  

localStorage.setItem('started',"off");

// listen for start/stop and results
browser.runtime.onMessage.addListener(notify);


function calculQuantile(quantiles,value)
{
for (var i=1;i<quantiles.length;i++)
	{
	if (value<quantiles[i]) return (i + (value-quantiles[i-1])/(quantiles[i] -quantiles[i-1]));
	}
return quantiles.length;
}

function calculEcoIndex(dom,req,size)
{
var q_dom= calculQuantile(quantiles_dom,dom);
var q_req= calculQuantile(quantiles_req,req);
var q_size= calculQuantile(quantiles_size,size);

return Math.round(100 - 5 * (3*q_dom + 2*q_req + q_size)/6);
}

function getNote(eco_index)
{
if (eco_index > 75) return "A";
if (eco_index > 65) return "B";
if (eco_index > 50) return "C";
if (eco_index > 35) return "D";
if (eco_index > 20) return "E";
if (eco_index > 5) return "F";
return "G";
}


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

  filter.ondata = event => {
    byte_total = byte_total + event.data.byteLength;
    filter.write(event.data);
  }

  filter.onstop = event => {
    filter.disconnect();
  } 

  return {};
}

/*
* Listen for message form ecoindex.js
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
		browser.browserAction.setIcon({ path: "icons/ecoindex-32.png"});
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
		browser.browserAction.setIcon({ path: "icons/ecoindex-green-32.png"});
		nb_request=0;
		byte_total = 0;
		console.log("Start the analyse");
		return 	
		}
	if (json_message.dom_size)
		{
	    console.log("Dom Size received: "+ json_message.dom_size);
		localStorage.setItem("dom_size",json_message.dom_size);
	    console.log("url: " + json_message.url);
		localStorage.setItem("url",json_message.url);

		var eco_index= calculEcoIndex(json_message.dom_size,nb_request,Math.round(byte_total/1000));

		console.log("ecoindex=" + eco_index);
		localStorage.setItem("eco_index",eco_index);
		localStorage.setItem("note",getNote(eco_index));
		storeInHistory(json_message.url,nb_request,Math.round(byte_total/1000),json_message.dom_size,eco_index,getNote(eco_index));
		}
  	}

/*

*/
function storeInHistory(url,req,kbyte,domsize,eco_index,note)
{
var analyse_history;
var string_analyse_history = localStorage.getItem("analyse_history");

if (string_analyse_history)
	{
	analyse_history =JSON.parse(string_analyse_history);
	analyse_history.reverse();
	analyse_history.push({result_date:new Date(),url:url,req:req,kbyte:kbyte,domsize:domsize,eco_index:eco_index,note:note});
	analyse_history.reverse();
	}
else analyse_history = [{date:new Date(),url:url,req:req,kbyte:kbyte,domsize:domsize,eco_index:eco_index,note:note}];

localStorage.setItem("analyse_history",JSON.stringify(analyse_history));
}


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


