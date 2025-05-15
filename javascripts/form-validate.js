function validationemail() {
	var emailID=document.getElementById("MainForm").websitesurveytxt-emailTextbox;
	if ((emailID.value==null)||(emailID.value=="")){
		alert("Please enter Email Address ");
		emailID.focus();
		return false;
	}
	if (echeck(emailID.value)==false){
		emailID.focus();
		return false;
	}
	return true;
}

function validationres() {
	var emailID=document.getElementById("MainForm").websitesurveytxt-emailTextbox;
	if (document.getElementById("MainForm").websitesurveytxt-first-nameTextbox.value=="") {
		alert ("Please enter Full Name");
		document.getElementById("MainForm").websitesurveytxt-first-nameTextbox.focus();
		return false;
	}
	if (document.getElementById("MainForm").websitesurveytxt-last-nameTextbox.value=="") {
		alert ("Please enter Full Name");
		document.getElementById("MainForm").websitesurveytxt-last-nameTextbox.focus();
		return false;
	}
}

// dont remove, being used in the functions //

var bugchars = '!#$^&*()+|}{[]?><~%:;/,=`"\'';

function CharsInBag(s) {   
var i;
var lchar="";
    // Search through string's characters one by one.
    // If character is not in bag.
    for (i = 0; i < s.length; i++) {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
		if(i>0)lchar=s.charAt(i-1);
        if (bugchars.indexOf(c) != -1 || (lchar=="." && c==".")) return false;
    }
    return true;
}

function isInteger(s) {
	var i;
    for (i = 0; i < s.length; i++) {
        // Check that current character is not a number.
        var c = s.charAt(i);
        if ((c >= "0") && (c <= "9") && (c != ".")) return false;
    }
    // All characters are numbers.
    return true;
}

function echeck(str) {
	var at="@";
	var dot=".";
	var lat=str.indexOf(at);
	var lstr=str.length;
	var ldot=str.indexOf(dot);
	var lastdot=str.lastIndexOf(dot);
	
	if (str.indexOf(at)==-1){
	   alert("Email Address should be in the form of xyz@domainname");
	   return false;
	}
	if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
	   alert("Email Address should be in the form of xyz@domainname");
	   return false;
	}
	if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr || str.substring(lastdot+1)==""){
		alert("Email Address should be in the form of xyz@domainname");
		return false;
	}
	if (str.indexOf(at,(lat+1))!=-1){
		alert("Email Address should be in the form of xyz@domainname");
		return false;
	}
	if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		alert("Email Address should be in the form of xyz@domainname");
		return false;
	}
	if (str.indexOf(dot,(lat+2))==-1){
		alert("Email Address should be in the form of xyz@domainname");
		return false;
	}
	if (str.indexOf(" ")!=-1){
		alert("Email Address should be in the form of xyz@domainname");
		return false;
	}
	if(CharsInBag(str)==false){
		alert("Email Address should be in the form of xyz@domainname");
		return false;
	}
	var arrEmail=str.split("@");
	var ldot=arrEmail[1].indexOf(".");
	if(isInteger(arrEmail[1].substring(ldot+1))==false){
		alert("Email Address should be in the form of xyz@domainname");
		return false;
	}
	return true;
}

function ValidateForm()
{
	firstnm = document.getElementById("contactFormtxt-first-nameTextbox");
	lastnm =  document.getElementById("contactFormtxt-last-nameTextbox");	
	emailID = document.getElementById("contactFormtxt-emailTextbox");
	title = document.getElementById("contactFormtxt-titleTextbox");	
	city = document.getElementById("contactFormtxt-cityTextbox");
	state = document.getElementById("contactFormtxt-stateTextbox");	
	country = document.getElementById("contactFormtxt-countryTextbox");
	qc = document.getElementById("contactFormtxt-commentTextarea");
	captchaCode = document.getElementById("contactFormcaptcha-codeCaptchaText");
	st_address =  document.getElementById("contactFormtxt-st-addressTextbox");

	// validation for email Address

     if(firstnm.value == '')
	{
		alert ('Please enter First Name.');
		firstnm.focus();
		return false;		
	}
	
    
	if(lastnm.value == '')
	{
		alert ('Please enter Last Name.');
		lastnm.focus();
		return false;		
	}

	if(emailID.value != '')
	{
		if (echeck(emailID.value)==false){
			alert ('Invalid Email Address.');
			emailID.focus();
			return false;
		}
	}
else
{
alert ('Please enter Email Address.');
		emailID.focus();
		return false;
}
	
	if(title.value == '')
	{
		alert ('Please enter Title.');
		title.focus();
		return false;		
	}
	
	if(st_address.value == '')
	{
		alert ('Please enter Stree Address.');
		st_address.focus();
		return false;		
	}
	
	if(city.value == '')
	{
		alert ('Please enter City Name.');
		city.focus();
		return false;		
	}
	
	if(state.value == '')
	{
		alert ('Please enter State Name.');
		state.focus();
		return false;		
	}
	
	if(country.value == '')
	{
		alert ('Please enter Country Name.');
		country.focus();
		return false;		
	}

	if(qc.value == '')
	{
		alert ('Please enter Questions & Comments.');
		qc.focus();
		return false;		
	}
	
	if(captchaCode.value == '')
	{
		alert ('Please enter Captcha Code.');
		captchaCode.focus();
		return false;		
	}
	
	
	
	return true;		
}