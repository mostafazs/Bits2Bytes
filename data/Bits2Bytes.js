/*
	@Copyright Bits2Bytes By Mostafa
*/
//check for offline or online instead of using ajax request function
function checkOfflineOnline() {
    var state = navigator.onLine ? "online" : "offline";
    return state;
}
//Hide loader
document.getElementById("loader").style.display="none"; //can use css instead
document.getElementById("in_submit").onclick=function(event){
var BrowserStatus = checkOfflineOnline();
//check for number and not empty value
var input_value = document.getElementById("amountField").value;
if(input_value == "" || isNaN(input_value)){
	alert("Please enter a numeric value");
}
else if( BrowserStatus == "offline" ){
	alert("Bits2Bytes Need Active Internet Connection.");
}
else
{
//Show loader
document.getElementById("loader").style.display="";
var resultTable = document.getElementById("resultTable");
resultTable.rows[0].cells[1].txtContent = "A";
var form = document.getElementById("main_form");
var results = document.getElementById("results");
var serialize_value = serialize(form);
console.log(serialize_value);
//var amountField = document.getElementById("amountField").value;
//var unit = document.getElementById("unitList").value;
		var XHR=new ajaxRequest();
				XHR.onreadystatechange=function(){
				if (XHR.readyState==4){
					if (XHR.status==200){ //We dont need this for addon--> || window.location.href.indexOf("http")==-1
						var response = XHR.responseText;
						console.log(response);
						var response = JSON.parse(response);
						console.log(response);
							if(response.ok == true){
							//use TextNode instead of innerHTML , because of Firefox Add On :(
							
							//now check each tr value and set new value (clean old value)
							var re = Array(12);
								re[0]=response.result.A;
								re[1]=response.result.B;
								re[2]=response.result.C;
								re[3]=response.result.D;
								re[4]=response.result.E;
								re[5]=response.result.F;
								re[6]=response.result.G;
								re[7]=response.result.H;
								re[8]=response.result.I;
								re[9]=response.result.J;
								re[10]=response.result.K;
								re[11]=response.result.L;
								//check for delete append error when user calculate new value(delete old error
								//when user calculating new value)
								for(i=0;i<results.childNodes.length;i++){
									if(results.childNodes[i].nodeType == 3){
										var NodeForDel = results.childNodes[i];
										results.removeChild(NodeForDel);
									}
								}
								//now append table tr values
							for(i=0;i<resultTable.rows.length;i++){
							//console.log(resultTable.rows[i].cells[1].txtContent);
							if(resultTable.rows[i].cells[1].textContent != ""){
								var ChildNodeForDel = resultTable.rows[i].cells[1].childNodes[0];
								resultTable.rows[i].cells[1].removeChild(ChildNodeForDel);
								resultTable.rows[i].cells[1].appendChild(document.createTextNode(re[i]));//
								//resultTable.rows[i].cells[1].innerHTML=( document.createTextNode(response.result.j) ).nodeValue;
								
								
							}
							
							}

							console.log(document.getElementById("resultTable"));
							console.log(results);
						}
						else{
						window.alert("Response is not ok.");
						for(i=0;i<results.childNodes.length;i++){
							if(results.childNodes[i].nodeType == 3) {//Node is text
								results.childNodes[i].nodeValue = ""; // we dont remove node,just empty it
							}
						}

						console.log(results);
						console.log(response);
						}
						//hide loader
						document.getElementById("loader").style.display="none";
					}
					else if(XHR.status == "0"){
						alert("An error occured making request...internet issue."+XHR.status);
						//hide loader
						document.getElementById("loader").style.display="none";
						}
					else if(XHR.status == "301"){
						alert("Network Connection:301-Moved Permanently.");
						//hide loader
						document.getElementById("loader").style.display="none";
					}
					else if(XHR.status == "304"){
						alert("Network Connection:304-Not Modified.");
						//hide loader
						document.getElementById("loader").style.display="none";
					}
					else if(XHR.status == "404"){
						alert("Network Connection:404-Not Found.");
						//hide loader
						document.getElementById("loader").style.display="none";
					}
					else if(XHR.status == "403"){
						alert("Network Connection:403-Forbidden.");
						//hide loader
						document.getElementById("loader").style.display="none";
					}
					else if(XHR.status == "401"){
						alert("Network Connection:401-Unauthorized.");
						//hide loader
						document.getElementById("loader").style.display="none";
					}
					
					}
				}
				XHR.ontimeout=function(){
					alert("Timeout making request");
					//hide loader
					document.getElementById("loader").style.display="none";
				}
	
		//var RequestURL = "./bit2bytes.php";
		//var RequestURL = "http://localhost/+Development_Process/Firefox/Firefox_Addons/Bit2Bytes/bit2bytes.php";//for test
		var RequestURL = "http://bit2bytes.herokuapp.com/bit2bytes.php";
		//XHR.open("GET", RequestURL+"?amt="+amountField+"&unit="+unit, true); // For GET Request
		XHR.open("POST", RequestURL, true);
		XHR.setRequestHeader("content-type","application/json");//optional
		XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		XHR.send(serialize_value);
		
		
		}//check input else
}