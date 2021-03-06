 

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 *
 * @author didierfred@gmail.com
 */

window.onload = function() {

	var url= localStorage.getItem('url');
	var eco_index = localStorage.getItem('eco_index');
	var note= localStorage.getItem('note');

	var html ="<table class=\"table table-condensed\"> <tbody>";
	html+="<tr><td>Url</td><td> " + url + "</td></tr>";
	html+="<tr><td> "+ browser.i18n.getMessage("requestNumber") +  "</td><td>" + localStorage.getItem('nb_request')  + "</td></tr>";
	html+="<tr><td> " + browser.i18n.getMessage("pageSize") +  " </td><td>" + localStorage.getItem('byte_total')/1000 + " </td></tr>";
	html+="<tr><td>" + browser.i18n.getMessage("domSize") +  " </td><td>" + localStorage.getItem("dom_size") + "</td></tr>";
    html+="<tr><td>" + browser.i18n.getMessage("greenhouseGasesEmission") +  "</td><td>" + localStorage.getItem("ges") + "</td></tr>";
    html+="<tr><td>" + browser.i18n.getMessage("waterConsumption") +  " </td><td>" + localStorage.getItem("water") + "</td></tr>";
	html+="<tr><td>Eco Index </td><td>" + eco_index + "</td></tr>";
	html+='<tr><td>' + browser.i18n.getMessage("grade") +  ' </td><td> <span class="note ' + note +'">' + note + '</span></td></tr></tbody></table>';
	
	document.getElementById("result").innerHTML=html;
} 



