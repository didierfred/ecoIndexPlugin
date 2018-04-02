
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

var quantiles_dom = [10,20,40,80,120,180,250,350,450,600,800,1000,1250,1500,1750,2000,2300,2600,3000,3500,594000]
var quantiles_req = [1,2,4,6,10,15,20,40,60,80,100,150,300,500,750,1000,1250,1500,2000,3000,4000]
var quantiles_size = [50,100,200,300,500,750,1000,1300,1600,1900,2300,2800,3500,4300,5300,6500,8500,11000,14000,18000,22000]

localStorage.setItem('started',"off");

// listen for start/stop and results
browser.runtime.onMessage.addListener(notify);


function calculQuantile(quantiles,value)
{
for (var i=0;i<quantiles.length;i++)
	{
	if (value<quantiles[i]) return i;
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


