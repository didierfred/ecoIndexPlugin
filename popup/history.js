 

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

	document.getElementById('delete_all_button').addEventListener('click',function (e) {delete_all();});
	document.getElementById('export_button').addEventListener('click',function (e) {export_data();});
 	view_history();	
} ;



/**
For each line in history , write it on the page as a table line
**/
function view_history()
	{
	var string_analyse_history = localStorage.getItem("analyse_history");
	
	if (string_analyse_history)
		{
		analyse_history =JSON.parse(string_analyse_history);
		for (var to_add of analyse_history) appendLine(to_add.result_date,to_add.url,to_add.req,to_add.kbyte,to_add.domsize,to_add.ges,to_add.water,to_add.eco_index,to_add.note);
		}
	}

/**
* Add a new history line on the UI 
**/
function appendLine(result_date,url,request,size,dom,ges,water,ecoindex,note) 
	{
	var date = new Date(result_date);
	var html = "<td>" + date.toLocaleDateString() + " " + date.toLocaleTimeString() + "</td>";
	html = html + "<td>" + url + "</td>";
	html = html + "<td>" + request + "</td>";
	html = html + "<td>" + size + "</td>";
	html = html + "<td>" + dom + "</td>";
	html = html + "<td>" + ges + "</td>";
	html = html + "<td>" + water + "</td>";
	html = html + "<td>" + ecoindex + "</td>";
	html = html + "<td>" + '<span class="note ' + note +'">' + note + '</span>'  + "</td>";

	html = html +  "</td> <a href=\"#\" id=\"delete_button" + line_number + "\" class=\"btn btn-primary btn-sm\"> <span class=\"glyphicon glyphicon-trash\"></span> Effacer </a></td>"; 

//	html = html + "<td><input class=\"btn btn-primary btn-xs\" type=\"button\" value=\"Effacer\" id=\"delete_button" + line_number + "\"></input> </td>";

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


function delete_all()
	{
	if (window.confirm("Voulez vous vraiment supprimer tout l'historique ?")) 
		{
		localStorage.removeItem("analyse_history");
		document.location.reload();
		}
	}

function create_csv()
	{
	var csv="Date;Url;Nombre requêtes;Taille(kb);Taille du dom;GES;Eau;ecoIndex;Note\n";
	analyse_history.forEach(function(analyse)  
		{
		csv += analyse.result_date + ";\"" + analyse.url + "\";" + analyse.req +";" + analyse.kbyte + ";" + analyse.domsize + ";" + analyse.ges + ";" + analyse.water + ";" + analyse.eco_index + ";" + analyse.note + "\n";
		})
	return csv;
	}



function export_data()
	{
	// Create file data
	var to_export= create_csv();
	
	// Create file to save 
	var a         = document.createElement('a');
	a.href        = 'data:attachment/csv,' +  encodeURIComponent(to_export);
	a.target      = 'download';
	a.download    = 'ecoindex.csv';
	
	// use iframe "download" to put the link (in order not to be redirect in the parent frame)
	var myf = document.getElementById("download");
	myf = myf.contentWindow.document || myf.contentDocument;
	myf.body.appendChild(a);
	a.click();
	}
