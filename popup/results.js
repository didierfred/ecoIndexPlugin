 

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 *
 * @author didierfred@gmail.com
 * @version 0.1
 */



window.onload = function() {
	var url= localStorage.getItem('url');
	document.write("url=" + url + "<br/><br/>");
	var result ="Nb request = " + localStorage.getItem('nb_request') + ", Size = " + localStorage.getItem('byte_total')/1000 + " KBytes , Dom size =" + localStorage.getItem("dom_size") + "<br/><br/>";
	document.write(result);
	var eco_index = localStorage.getItem('eco_index');
	document.write("eco_index=" + eco_index );

} ;



