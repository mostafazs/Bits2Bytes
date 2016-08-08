/**
*  With Bits2Bytes you can convert various computer data units to each other.
*  @version 1.1.0
*  @author Mostafa Ziasistani
*  @copyright 2015-2016 Mostafa Ziasistani
*  @license MIT
**/

/**
@deprecated
function checkOfflineOnline() {
    var state = navigator.onLine ? "online" : "offline";
    return state;
}
**/
var BITS_IN_A_BYTE = 8;
var KILO = 1024;
var output = Array(12);
/**
*  convert units to each other
*  @since 1.1.0
**/
function convert(amt, unit) {
	switch (unit) {
		case 'b':
			output[0] = amt;
			break;
		case 'B':
			output[0] = amt * BITS_IN_A_BYTE;
			break;
		case 'kb':
			output[0] = amt * KILO;
			break;
		case 'kB':
			output[0] = amt * BITS_IN_A_BYTE * KILO;
			break;
		case 'mb':
			output[0] = amt * KILO * KILO ;
			break;
		case 'mB':
			output[0] = amt * KILO * KILO * BITS_IN_A_BYTE;
			break;
		case 'gb':
			output[0] = amt * KILO * KILO * KILO;
			break;
		case 'gB':
			output[0] = amt *KILO * KILO * KILO * BITS_IN_A_BYTE;
			break;
		case 'tb':
			output[0] = amt * KILO * KILO * KILO * KILO;
			break;
		case 'tB':
			output[0] = amt *KILO * KILO * KILO * KILO * BITS_IN_A_BYTE;
			break;
		case 'pb':
			output[0] = amt * KILO * KILO * KILO * KILO * KILO;
			break;
		case 'pB':
			output[0] = amt *KILO * KILO * KILO * KILO * KILO * BITS_IN_A_BYTE;
			break;
		default:
			break;
	}
}
function Loader(status){
  //Hide loader
  document.getElementById("loader").style.display=status;
}
Loader("none");
document.getElementById("in_submit").onclick=function(event){
  //Default form submit
  event.preventDefault();
  Loader("");
//check for number and not empty value
var input_value = document.getElementById("amountField").value;
if(input_value == "" || isNaN(input_value)){
	alert("Please enter a numeric value");
}
else
{
Loader("");
var resultTable = document.getElementById("resultTable");
resultTable.rows[0].cells[1].txtContent = "A";
var form = document.getElementById("main_form");
var results = document.getElementById("results");

  var amountField = document.getElementById("amountField").value;
  var list = document.getElementById('unitList');
  var unit = list.options[list.selectedIndex].value;

//console.log(amountField+" "+unit);
//console.log(list);
//console.log(form);
//console.log(results);

  convert(amountField,unit);
	output[1] = output[0] / BITS_IN_A_BYTE;
	output[2] = output[0] / KILO,
	output[3] = output[2] / BITS_IN_A_BYTE,
	output[4] = output[2] / KILO,
	output[5] = output[4] / BITS_IN_A_BYTE,
	output[6] = output[4] / KILO,
	output[7] = output[6] / BITS_IN_A_BYTE,
	output[8] = output[6] / KILO,
	output[9] = output[8] / BITS_IN_A_BYTE,
	output[10] = output[8] / KILO,
	output[11] = output[10] / BITS_IN_A_BYTE;

//console.log(output);
  //check for delete append error when user calculate new value(delete old error
  //when user calculating new value)
  for(i=0;i<results.childNodes.length;i++){
    if(results.childNodes[i].nodeType == 3){
      var NodeForDel = results.childNodes[i];
      results.removeChild(NodeForDel);
    }
  }

for(j=1;j<=output.length;j++)  {
  //now append table tr values
  for(i=0;i<resultTable.rows.length;i++){
  //console.log(resultTable.rows[i].cells[1].txtContent);
  if(resultTable.rows[i].cells[1].textContent != ""){
  var ChildNodeForDel = resultTable.rows[i].cells[1].childNodes[0];
  resultTable.rows[i].cells[1].removeChild(ChildNodeForDel);
  resultTable.rows[i].cells[1].appendChild(document.createTextNode(output[i]));//
  //resultTable.rows[i].cells[1].innerHTML=( document.createTextNode(response.result.j) ).nodeValue;


  }

  }

}

  //console.log(document.getElementById("resultTable"));
  //console.log(results);


  //console.log(output[0]+" "+output[1]+" "+output[2]+" "+output[3]+" "+output[4]+" "+output[5]+" "+output[6]+" "+output[7]+" "+output[8]+" "+output[9]+" "+output[10]+" "+output[11]);
Loader("none");
		}//check input else
}
