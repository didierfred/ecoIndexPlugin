 

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
	//var newDiv = document.createElement("div");

	var html ="<table class=\"table table-condensed\"> <tbody>";
	html+="<tr><td>Url</td><td> " + url + "</td></tr>";
	html+="<tr><td>Nombre de  requêtes </td><td>" + localStorage.getItem('nb_request')  + "</td></tr>";
	html+="<tr><td>Taille   </td><td>" + localStorage.getItem('byte_total')/1000 + " KBytes </td></tr>";
	html+="<tr><td>Taille du DOM  </td><td>" + localStorage.getItem("dom_size") + "</td></tr>";
    html+="<tr><td>GES  </td><td>" + localStorage.getItem("ges") + "</td></tr>";
    html+="<tr><td>Eau  </td><td>" + localStorage.getItem("water") + "</td></tr>";
	html+="<tr><td>Eco Index </td><td>" + eco_index + "</td></tr>";
	html+='<tr><td>Note </td><td> <span class="note ' + note +'">' + note + '</span></td></tr></tbody></table>';
	
	console.log("html=" + html);
	// newDiv.innerHTML =html;
	
	document.getElementById("result").innerHTML=html;
	
	//document.getElementById("result").appendChild(newDiv);

} 



