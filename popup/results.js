 

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 *
 * @author didierfred@gmail.com
 * @version 0.1
 */



window.onload = function() {

	var url= localStorage.getItem('url');
	var eco_index = localStorage.getItem('eco_index');
	var note= localStorage.getItem('note');
	var newDiv = document.createElement("div");

	var html ="";
	html+="url=" + url + "<br/><br/>";
	html+="Nb request = " + localStorage.getItem('nb_request') + ", Size = " + localStorage.getItem('byte_total')/1000 + " KBytes , Dom size =" + localStorage.getItem("dom_size") + "<br/><br/>";
	html+="eco_index=" + eco_index;
	html+='<br/>Note : <span class="note">' + note + '</span>';
console.log("html=" + html);
	newDiv.innerHTML =html;
	document.getElementById("result").appendChild(newDiv);

} 



