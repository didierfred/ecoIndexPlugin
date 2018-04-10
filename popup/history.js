 

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 *
 * @author didierfred@gmail.com
 * @version 0.1
 */


var line_number=0;
var analyse_history =[];
var corresponding_index_for_line =[];

window.onload = function() {
 view_history();	
} ;




function view_history()
	{
	var string_analyse_history = localStorage.getItem("analyse_history");
	
	if (string_analyse_history)
		{
		analyse_history =JSON.parse(string_analyse_history);
		for (var to_add of analyse_history) appendLine(to_add.result_date,to_add.url,to_add.req,to_add.kbyte,to_add.domsize,to_add.eco_index,to_add.note);
		}
	}

/**
* Add a new history line on the UI 
**/
function appendLine(result_date,url,request,size,dom,ecoindex,note) 
	{
	var html = "<td>" + result_date + "</td>";
	html = html + "<td>" + url + "</td>";
	html = html + "<td>" + request + "</td>";
	html = html + "<td>" + size + "</td>";
	html = html + "<td>" + dom + "</td>";
	html = html + "<td>" + ecoindex + "</td>";
	html = html + "<td>" + '<span class="note ' + note +'">' + note + '</span>'  + "</td>";
	html = html + "<td><input class=\"button\" type=\"button\" value=\"Delete\" id=\"delete_button" + line_number + "\"></input> </td>";

	var newTR = document.createElement("tr");
	newTR.id="line" + line_number;
	newTR.innerHTML = html;
	document.getElementById("history").appendChild(newTR);

	var line_number_to_delete = line_number;
	document.getElementById('delete_button'+line_number).addEventListener('click',function to_delete(e) {delete_line(line_number_to_delete)});
	corresponding_index_for_line.push(line_number);		
	line_number++;
	}



function delete_line(line_number_to_delete)
	{
	var Node_to_delete = document.getElementById("line"+(line_number_to_delete));
    	Node_to_delete.parentNode.removeChild(Node_to_delete);

	analyse_history.splice(corresponding_index_for_line[line_number_to_delete],1);
	for (var i=line_number_to_delete+1;i<corresponding_index_for_line.length;i++)
		{
		corresponding_index_for_line[i] = corresponding_index_for_line[i]  - 1; 
		}
	localStorage.setItem("analyse_history",JSON.stringify(analyse_history));
	}
