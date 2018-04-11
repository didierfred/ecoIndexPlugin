 

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

	var html ="<table>";
	html+="<tr><td class=\"champ\">Url</td><td class=\"valeur_champ\"> " + url + "</td></tr>";
	html+="<tr><td class=\"champ\">Nombre de  requêtes </td><td class=\"valeur_champ\">" + localStorage.getItem('nb_request')  + "</td></tr>";
	html+="<tr><td class=\"champ\">Taille   </td><td class=\"valeur_champ\">" + localStorage.getItem('byte_total')/1000 + " KBytes </td></tr>"
	html+="<tr><td class=\"champ\">Taille du DOM  </td><td class=\"valeur_champ\">" + localStorage.getItem("dom_size") + "</td></tr>";
	html+="<tr><td class=\"champ\">Eco Index </td><td class=\"valeur_champ\">" + eco_index + "</td></tr>";
	html+='<tr><td class=\"champ\">Note </td><td class=\"valeur_champ\"> <span class="note ' + note +'">' + note + '</span></td></tr></table>';
console.log("html=" + html);
	newDiv.innerHTML =html;
	document.getElementById("result").appendChild(newDiv);

} 



