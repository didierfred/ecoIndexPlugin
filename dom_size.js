 

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 *
 * @author didierfred@gmail.com
 * @version 0.1
 */

var dom_size=document.getElementsByTagName("*").length;
console.log("local dom size=" + dom_size)
var message = {"dom_size":dom_size};
//localStorage.setItem('url',document);
browser.runtime.sendMessage(JSON.stringify(message));