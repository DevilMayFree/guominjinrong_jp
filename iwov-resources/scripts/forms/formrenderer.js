const { ControlLabel } = require("react-bootstrap");

var noFocus = false;

function check_state(checkbox) {
    var val = checkbox.value;
  checkbox.checked ? checkbox.setAttribute("checked", true) : checkbox.removeAttribute("checked");
}

function isFormValid(formname, novalidate) {
    var form = document.getElementsByName(formname)[0];
    var allowElements = ['text', 'number', 'email', 'url', 'password'];
    var valid = true;
    noFocus = true;
    // validate input elements
    var input_elements = form.getElementsByTagName("input");


    if (isValidData(input_elements)) {
        for (var i = 0; i < input_elements.length; i++) {
            if (allowElements.indexOf(input_elements[i].getAttribute('type')) != -1 && input_elements[i].getAttribute("aria-invalid") === "true") {
                var element_id = input_elements[i].id;
                if (!validateForm(form, element_id, novalidate))
                    valid = false;
                if (input_elements[i].type !== "file" && element_id.indexOf("file") === -1 && !validateMaskPattern(form, element_id, null))
                    valid = false;
            }
            let invalidField;
            if (input_elements[i].getAttribute("aria-invalid") === "true") {

                invalidField = input_elements[i]; // Store the first invalid field
                invalidField.focus();
                return valid;
            }

        }
    }

    // validate dropdown elements

    var select_elements = form.getElementsByTagName("select");
    if (isValidData(select_elements)) {
        for (var j = 0; j < select_elements.length; j++) {
            if (!validateForm(form, select_elements[j].id, novalidate))
                valid = false;
            let invalidField;
            if (select_elements[j].getAttribute("aria-invalid") === "true") {

                invalidField = select_elements[j]; // Store the first select element invalid field
                invalidField.focus();
                return valid;
            }

        }
    }

    // validate textarea elements

    var textarea_elements = form.getElementsByTagName("textarea");
    if (isValidData(textarea_elements)) {
        for (var k = 0; k < textarea_elements.length; k++) {
            if (!validateForm(form, textarea_elements[k].id, novalidate))
                valid = false;
        }
    }
    if (!isFieldSelected(formname))
        valid = false;
  const formElementErrorContainer = form.querySelector(".cbds-c-formMicroalert");
  
  
  //This if condition is to validate single checkbox
  
    if(form.querySelector(".cbds-c-checkbox") !=null && !(form.querySelector(".cbds-c-checkbox").parentElement.classList.contains('cbds-c-checkboxGroup'))){
      const formElementTermsCheckbox = form.querySelector(".cbds-c-checkbox__input");

      /* check box error validation change event code starts*/
formElementTermsCheckbox.addEventListener("change", event => {
            if (event.target.checked) {
             form.querySelector(".cbds-c-checkbox").parentElement.nextElementSibling.classList.add('cbds-u-display__none');
            }
      else{
         form.querySelector(".cbds-c-checkbox").parentElement.nextElementSibling.classList.remove('cbds-u-display__none');
  		}
    });
         /* check box error validation change event code ends*/
      
 /* Checkbox validation on submit button starts*/ 
     const formElementCheckbox = form.querySelector(".cbds-c-checkbox__input");
 
		if (!formElementCheckbox.checked) {
          form.querySelector(".cbds-c-checkbox").parentElement.nextElementSibling.classList.remove('cbds-u-display__none');
           form.querySelector(".cbds-c-checkbox__input").focus();
          valid=false;
            }
      else{
        form.querySelector(".cbds-c-checkbox").parentElement.nextElementSibling.classList.add('cbds-u-display__none');
        valid=true;
      }     
	}
  /* Checkbox validation on submit button ends*/ 
  
  // This block will get excuted for the checkbox group validation
  if(form.querySelector(".cbds-c-checkboxGroup") !=null){ 
     var checkboxgroup = form.querySelector(".cbds-c-checkboxGroup");  
    
    
 /* check box group validation change event code starts*/
checkboxgroup.addEventListener("change", event => {
            if (event.target.checked) {
             form.querySelector(".cbds-c-checkboxGroup").parentElement.nextElementSibling.classList.add('cbds-u-display__none');
            }
  		else{
    		form.querySelector(".cbds-c-checkbox").parentElement.nextElementSibling.classList.remove('cbds-u-display__none');
 		 }
    });
 /* check box group validation change event code ends*/
  
    /* Checkbox group validation on submit button starts*/ 
            var checkbox_elements = checkboxgroup.getElementsByTagName("input");
            if (isValidData(checkbox_elements)) {
                for (var j = 0; j < checkbox_elements.length; j++) {
                    if (checkbox_elements[j].checked === true) {
                       //isCheckboxChecked = true;
                        valid = true;
                        break;
                    }
                    else
                    {
                        valid= false;         
                    }
                } // end for loop              
            }
            else
            {                
              valid=false;   
            }
   		  
            if (valid){
               form.querySelector(".cbds-c-checkboxGroup").parentElement.nextElementSibling.classList.add('cbds-u-display__none');
            }else{
              form.querySelector(".cbds-c-checkboxGroup").parentElement.nextElementSibling.classList.remove('cbds-u-display__none');
            }

    	  } 
  
    if (valid) {
        clearReadonly(form);
    
      showFormSuccess(); //adding the function to submit the form to the action url
        setTimeout(function () {
            document.forms['dcom-c-forms-component'].submit();
        }, 4000);
      
     console.log('submit successfull');
    }
    return valid;
}// isFormValid() function ends here


//Clearing Readonly flag for radio, checkbox, listbox and picklist  to get their value in request object
function clearReadonly(form) {
    var readonlyElements = form.querySelectorAll("input[type=radio],input[type=checkbox],select > option");
    readonlyElements.forEach(function (item) {
        item.removeAttribute("disabled");
    })
}
//clear validation error messages after clicking reset button
function clearErrors(formName) {
    var form = document.getElementsByName(formName)[0];
    var validationErrors = form.querySelectorAll('[id$="_errortext"]');
    for (var i = 0; i < validationErrors.length; i++) {
        var errorItem = validationErrors[i];
        errorItem.innerHTML = "";
    }
}

// checks whether given number is valid or not.
function isValidNumber(ele, e) {
    var valid_number = true;
    var ch = e.key;

    // In Edge, minus key on number pad returning 'Subtract'
    if (!(ch == "e" || ch == "E" || ch == "." || ch == "-" || ch == "Subtract" || (ch >= 0 && ch <= 9)))
        valid_number = false;

    // Allowing characters
    // keyCode 8 - backspace
    // keyCode 9 - tab
    // keyCode 46 - delete
    // keyCode 35 to 40 - Home , end and Arrow keys
    if (e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 46 || (e.keyCode >= 35 && e.keyCode <= 40))
        valid_number = true;
    // for not allowing space
    if (e.which == 32)
        valid_number = false;

    if (ele.validity.badInput == undefined) {
        var isStartsWithNumber = (!isNaN(ch) || ch == "-" || ch === "Subtract");
        if (ele.value.length == 0 && !isStartsWithNumber)
            valid_number = false;
    }

    return valid_number;
}

function validateNumber(form, ele, e) {
    var isBadInput = ele.validity.badInput;
    var id = ele.id;
    var value = "";
    var regex = /^(-)?\d+((e|E|\.)\d+)?$/;


    if (!regex.test(ele.value) || !isNumberInRange(ele)) {
        console.log(regex.test(ele.value));
        console.log(isNumberInRange(ele));
        isBadInput = true;
    }


    // In Edge, to retain the placeholder on blur.

    if (navigator.appVersion.indexOf("Edge") != -1) {
        if (ele.getAttribute("hinttext") != null && ele.value.length == 0) {
            ele.placeholder = ele.getAttribute("hinttext");
        }

    }
    // In IE11, validates the number if it is required field only.
    if (isBadInput == undefined) {
        console.log("Inside 2");
        value = ele.value;
        var num_regex = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]{1,2})?$/;
        if (!num_regex.test(value)) {
            if (ele.required && value == "")

                var key = null;

            else if (value != "")

                var key = "common.number";

            showNumberError(form, key, id);
            return false;
        }
        else {
            form.querySelector("#" + id + "_errortext").innerHTML = "";

            return true;
        }
    }
    else if (isBadInput == true) {
        console.log("Inside 3");
        var key = "common.number";
        showNumberError(form, key, id);
        return false;
    }
    else if (!isBadInput && ele.required && ele.value.length == 0) {
        console.log("Inside 4");
        var key = null;
        showNumberError(form, key, id);
        return false;
    }
    else {
        form.querySelector("#" + id + "_errortext").innerHTML = "";
        return true;
    }

}

// verifies the number is in specified min and max range which is defined in euform builder
function isNumberInRange(ele) {
    var isInRange = true;
    if (ele.getAttribute("min")) {
        isInRange = ele.value >= parseFloat(ele.getAttribute("min"));
    }
    if (ele.getAttribute("max")) {
        isInRange = isInRange && ele.value <= parseFloat(ele.getAttribute("max"));
    }

    return isInRange;

}

// If Edge, removes the placeholder on focus

function removePlaceHolder(ele) {

    if (navigator.appVersion.indexOf("Edge") != -1) {

        ele.setAttribute("hinttext", ele.placeholder);
        ele.placeholder = "";

    }
}

function showNumberError(form, key, id) {
    getErrorMessage(key, function (response) {

        if (isValidData(response)) {
            form.querySelector("#" + id + "_errortext").innerHTML = response;
        }

    });
}
//checking for valid file extensions
function getSelectedFiles(form, fileId) {
    if (isValidFileExtensions(form, fileId)) {
        var files = form.querySelector("#" + fileId).files;
        if (files.length > 1) {
            form.querySelector("#" + fileId + 'file_text').value = files.length + " files selected";
        }
        else {
            form.querySelector("#" + fileId + 'file_text').value = files[0].name;
        }
        form.querySelector("#" + fileId + 'file_text_errortext').innerHTML = "";
    }
    else {
        form.querySelector("#" + fileId + 'file_text').value = "";
        form.querySelector("#" + fileId + 'file_text_errortext').innerHTML = "Only  " + form.querySelector("#" + fileId).getAttribute("accept").trim() + " files are allowed.";
    }
}
function isValidFileExtensions(form, fileId) {
    var fileElement = form.querySelector("#" + fileId);
    var userSelectedFiles = fileElement.files;
    var accepttype = fileElement.getAttribute("accept");
    var matched = true;
    //check if the selected files are honouring the accept types.
    if (accepttype !== "*" && accepttype !== "") {
        for (var i = 0; i < userSelectedFiles.length; i++) {
            var userSelectedFileName = userSelectedFiles[i].name;
            var extension = userSelectedFileName.substring(userSelectedFileName.lastIndexOf("."));
            //ex: the user can give the accepted fileextensions as .png,.PNG,.Png and other combinations so converting to lowercase.
            if (accepttype.toLowerCase().indexOf(extension.toLowerCase()) == -1) {
                matched = false;
                break;
            }
        }
        if (!matched) {
            return false;
        }
    }
    return true;
}

function isValidData(data) {

    if (data === undefined || data === null)
        return false;

    if (typeof data !== "object" && data.trim().length === 0)
        return false;

    return true;
}

function isFieldSelected(formname) {

    var form = document.getElementsByName(formname)[0];
    var radiogroup = form.getElementsByClassName("radiogroup");
    var checkboxgroup = form.getElementsByClassName("checkboxgroup");

    var isRadioChecked, isCheckboxChecked;
    var isValid = true;
    var radioids = [], checkboxids = [];

    if (isValidData(radiogroup)) {
        for (var i = 0; i < radiogroup.length; i++) {
            isRadioChecked = false;

            if (radiogroup[i].getAttribute("required") == "false")
                continue;

            var radio_elements = radiogroup[i].getElementsByTagName("input");
            var radioid = radio_elements[i].id.substring(0, radio_elements[i].id.lastIndexOf("_"));
            radioids.push(radioid);

            if (isValidData(radio_elements)) {
                for (var j = 0; j < radio_elements.length; j++) {
                    if (radio_elements[j].checked === true)
                        isRadioChecked = true;
                }
            }

            if (!isRadioChecked) {
                isValid = false;
                getErrorMessage(null, function (response) {

                    if (isValidData(response)) {
                        form.querySelector("#" + radioids[0] + "_errortext").innerHTML = response;
                        if (noFocus) {
                            form.querySelector("#" + radioids[0]).focus();
                            noFocus = false;
                        }
                        radioids.splice(0, 1);
                    }
                });

            }
            else {
                var rlength = radioids.length;
                if (rlength == 0)
                    return;


                form.querySelector("#" + radioids[rlength - 1] + "_errortext").innerHTML = "";
                radioids.splice(rlength - 1, 1);
            }
        }
    }
  
    
    if (isValidData(checkboxgroup)) {
        for (var i = 0; i < checkboxgroup.length; i++) {
            isCheckboxChecked = false;

            if (checkboxgroup[i].getAttribute("required") == "false")
                continue;

            var checkbox_elements = checkboxgroup[i].getElementsByTagName("input");
            var checkboxid = checkbox_elements[i].id.substring(0, checkbox_elements[i].id.lastIndexOf("_"));
            checkboxids.push(checkboxid);

            if (isValidData(checkbox_elements)) {
                for (var j = 0; j < checkbox_elements.length; j++) {
                    if (checkbox_elements[j].checked === true)
                        isCheckboxChecked = true;
                }
            }

            if (!isCheckboxChecked) {
                isValid = false;
                getErrorMessage(null, function (response) {

                    if (isValidData(response)) {
                        form.querySelector("#" + checkboxids[0] + "_errortext").innerHTML = response;
                        if (noFocus) {
                            form.querySelector("#" + checkboxids[0]).focus();
                            noFocus = false;
                        }
                        checkboxids.splice(0, 1);
                    }
                });
            }
            else {
                var clength = checkboxids.length;
                if (clength == 0)
                    return;

                form.querySelector("#" + checkboxids[clength - 1] + "_errortext").innerHTML = "";
                checkboxids.splice(clength - 1, 1);
            }
        }
    }

  
    return isValid;
}

function validateForm(form, id, novalidate) {
    //console.log(form);
    console.log(id);
    console.log(novalidate);
    var element, element_pattern, element_value, elementType;
    var regex, mpattern;
    var isValid = true;
    var isValidate = false;

    element = form.querySelector("#" + id);
    var errorval = element.getAttribute("title");
    console.log(errorval);

    regex = element.getAttribute("pattern");
    mpattern = element.getAttribute("maskpattern");
    isValidate = element.getAttribute("validate") == "true" ? true : false;
    elementType = element.type;

    if (isValidData(regex) && regex[0] !== "^") {
        regex = "^" + regex;
    }

    if (isValidData(regex) && regex[regex.length - 1] !== "$") {
        regex = regex + "$";
    }


    if (regex != null)
        element_pattern = new RegExp(regex);

    element_value = element.value;

    if (element_value != undefined)
        element_value.trim();
    else
        element_value = "";

    if (element.required && (element_value.trim().length === 0 || (element.hasAttribute("dateformat") && !isValidDateTime(element)))) {
        console.log(element);
        //added custom js code to display or hide error message for select fields
        if (element.tagName === 'SELECT') {
            showErrorSelect(element);
        } else {
            showErrorinpage(element);
        }
        isValid = false;
        if (errorval === null) {
            var key = null;
            var badInput = element.validity.badInput;
            if (element.getAttribute("datatype") === "number" && badInput)
                key = "common.number";

            getErrorMessage(key, function (response) {

                if (isValidData(response)) {
                    form.querySelector("#" + id + "_errortext").innerHTML = response;
                    if (noFocus) {
                        form.querySelector("#" + id).focus();
                        noFocus = false;
                    }
                }
            });
        }
    }

    else if (novalidate && isValidate && isValidData(element_pattern) && isValidData(element_value) && !element_pattern.test(element_value) && errorval === null) {
        var key = element.getAttribute('key');
        if (!isValidData(key))
            key = "common.pattern";

        if (key.length > 1) {
            isValid = false;
            getErrorMessage(key, function (response) {

                if (isValidData(response)) {
                    form.querySelector("#" + id + "_errortext").innerHTML = response;
                    if (noFocus) {
                        form.querySelector("#" + id).focus();
                        noFocus = false;
                    }
                }
            });
        }
    }
    else if (element.required && isValidData(element_pattern) && isValidData(element_value) && !element_pattern.test(element_value) && errorval != null) {
        isValid = false;
        console.log(element_pattern);
        console.log(element_value);
        console.log(element_pattern.test(element_value));
        showErrorinpage(element);
    }
    else if (element.required) {
        if (element.tagName === 'SELECT') {
            hideErrorSelect(element);
        } else {
            hideErrorinpage(element);
        }
        if (errorval === null) {
            var err = form.querySelector("#" + id + "_errortext");
            if (err !== undefined && err !== null)
                err.innerHTML = "";
        }
        isValid = true;
    }

    return isValid;
}

function showErrorinpage(element) {
    element.classList.add('cbds-is-invalid');
    element.setAttribute('aria-invalid', true);
    element.parentElement.parentElement.classList.add('cbds-is-invalid');
    element.parentElement.nextElementSibling.classList.remove('cbds-u-display__none');
}

function hideErrorinpage(element) {
    element.classList.remove('cbds-is-invalid');
    element.setAttribute('aria-invalid', false);
    element.parentElement.parentElement.classList.remove('cbds-is-invalid');
    element.parentElement.nextElementSibling.classList.add('cbds-u-display__none');
}

function showErrorSelect(element) {
    element.classList.add('cbds-is-invalid');
    element.setAttribute('aria-invalid', true);
    element.parentElement.parentElement.classList.add('cbds-is-invalid');
    element.parentElement.parentElement.nextElementSibling.classList.remove('cbds-u-display__none');
}

function hideErrorSelect(element) {
    element.classList.remove('cbds-is-invalid');
    element.setAttribute('aria-invalid', false);
    element.parentElement.parentElement.classList.remove('cbds-is-invalid');
    element.parentElement.parentElement.nextElementSibling.classList.add('cbds-u-display__none');
}

function showFormSuccess() {
    var successOverlay = document.querySelector('#dcom-form-component-overlay-success');
  if(successOverlay!== null){
    successOverlay.classList.remove('cbds-u-display__none');
  }
}

function hideFormSuccess() {
    var successOverlay = document.querySelector('#dcom-form-component-overlay-success');
    successOverlay.classList.add('cbds-u-display__none');
}

//validating dateformat by replacing placeholder value with _
function isValidDateTime(dateField) {
    var placeholdervalue = dateField.getAttribute('placeholder');
    var datemask = placeholdervalue.replace(/[a-zA-Z]/g, "_");
    if (datemask === dateField.value) {
        return false;
    }
    return true;
}

var bundle = null;
function getErrorMessage(key, callback) {
    console.log(key);
    console.log(callback);
    if (key === undefined)
        return;
    if (bundle != null) {
        showErrorMessage(bundle, key, callback);
    }
    else {
        var messagesFile = jsonfile;
        if (locale != '') {
            messagesFile += "-" + locale;
        }
        messagesFile += ".json";

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', messagesFile, true);

        xobj.onreadystatechange = function () {

            if (xobj.status != 200) {
                locale = '';
                getErrorMessage(key, callback);
            }

            else if (xobj.readyState == 4 && xobj.status == 200) {
                bundle = JSON.parse(xobj.response);
                showErrorMessage(bundle, key, callback);
            }
        };
        xobj.send(null);
    }
}

function showErrorMessage(bundle, key, callback) {
    if (key === null) {
        callback(bundle["common"]["blank"]);
    }
    else {
        var value = key.split(".").reduce(
            function (m, k) {
                return m[k];
            }, bundle);

        if (callback !== null)
            callback(value);
        else
            return value;

    }
}

var maskTranslations = { "@": "^[a-zA-Z]$", "#": "^[0-9]$", "*": "^[a-zA-Z0-9]$" };
var maskChar = "_";
var maskNumber = "#";

function validateMaskPattern(form, id, e) {

    var maskElement = form.querySelector("#" + id);
    var maskPattern = maskElement.getAttribute("maskpattern");


    if (maskPattern == null)
        return true;
    //Firefox returns not null while pressing tab for which focusout not working in Firefox for masked fields . to avoid such issue nullfy the object .JIRA no -WCM-16365
    if (e !== null) {
        if (e.key === 'Tab') {
            e = null;
            var tabPressedFlag = "TabPressed";
        }
    }
    if (e === null) {
        if (getIndex(maskElement) == -1) {
            form.querySelector("#" + id + "_errortext").innerHTML = "";
            return true;
        }
        else {
            var key = "common.pattern";
            getErrorMessage(key, function (response) {
                if (typeof tabPressedFlag !== 'undefined' && tabPressedFlag === 'TabPressed') {
                    return true;
                }
                if (isValidData(response)) {
                    form.querySelector("#" + id + "_errortext").innerHTML = response;
                    if (noFocus) {
                        form.querySelector("#" + id).focus();
                        noFocus = false;
                    }
                }
            });
        }
    }

    var ch = "";
    if (e != null) {
        ch = e.key;
    }

    var maskIndex = getIndex(maskElement);
    var startString = "";

    startString = maskElement.value.substring(0, maskIndex);

    if (maskIndex == -1)
        startString = maskElement.value;

    var inputValue = startString + "" + ch;
    var length = inputValue.length;
    var newValue = maskElement.value;
    var pattern = "";

    if (length > maskPattern.length)
        return false;

    for (var i = 0; i < maskPattern.length; i++) {
        var index = length + (i - 1);
        pattern = maskTranslations[maskPattern[index]];

        if (pattern === undefined && ch !== maskPattern[index]) {
            newValue += maskPattern[index];
        }
        else {
            break;
        }
    }

    var regex = new RegExp(pattern);
    if (!regex.test(ch)) {
        return false;
    }
    else {

        var mask = maskElement.value[getIndex(maskElement)];
        maskElement.value = newValue.replace(mask, ch);
        setCaretPosition(maskElement, startString.length + 1)
        return false;
    }


}

function getIndex(maskElement) {
    var maskCharIndex = maskElement.value.indexOf(maskChar);
    var maskNumberIndex = maskElement.value.indexOf(maskNumber);

    if (maskCharIndex == -1)
        return maskNumberIndex;

    if (maskNumberIndex == -1)
        return maskCharIndex;

    if (maskCharIndex < maskNumberIndex)
        return maskCharIndex;
    else
        return maskNumberIndex;
}


function setCaretPosition(ctrl, pos) {

    // Modern browsers
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);

        // IE8 and below
    } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}



function setCaret(form, id) {
    var ele = form.querySelector("#" + id);
    var sub = ele.value.substring(0, getIndex(ele));
    var patt = ele.getAttribute("maskpattern");

    var value = ele.value[ele.selectionStart - 1];
    if (patt.indexOf(value) != -1 || value == maskChar || value == maskNumber)
        setCaretPosition(ele, sub.length);
}

function checkKey(form, id, e) {
    if (e.keyCode == 8 || e.keyCode == 46) {
        var element = form.querySelector("#" + id);
        var pattern = element.getAttribute("maskpattern");
        var startPosition = element.selectionStart;
        var endPosition = element.selectionEnd;



        while (endPosition >= startPosition) {
            position = endPosition;

            if (e.keyCode == 8 || startPosition != endPosition)
                position--;

            if (element.value[position] != maskChar || element.value[position] != maskNumber || pattern.indexOf(element.value[position]) != -1) {
                var startsWith = element.value.substring(0, position);
                var sc = pattern[position];

                if (sc == undefined)
                    sc = "";

                if (sc == "@" || sc == "*") {
                    sc = maskChar;
                }

                var endsWith = element.value.substring(position + 1);

                element.value = startsWith + "" + sc + "" + endsWith;

                while (position != -1 && startsWith.concat(sc)[position - 1] == pattern[position - 1]) {

                    position--;
                }

                if (position < 0)
                    position = 0;

                if (position >= 0)
                    setCaretPosition(element, position);

            }

            endPosition--;

            if (endPosition == startPosition)
                break;
        }

        return false;
    }
}

function showMask(form, id) {
    var ele = form.querySelector("#" + id);
    var mask = ele.getAttribute("maskpattern");
    var value = ele.value;
    if (value != "")
        return;

    if (mask == null || mask == undefined)
        return;

    mask = mask.replaceAll("@", maskChar).replaceAll("*", maskChar);
    ele.value = mask;
}

function hideMask(form, id) {
    var ele = form.querySelector("#" + id);
    var mvalue = ele.value;
    var mpattern = ele.getAttribute("maskpattern");

    if (mpattern.replaceAll("@", maskChar).replaceAll("*", maskChar) == mvalue) {
        ele.value = "";
    }

}

String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};



function openCalendar(form, id, e) {
    var elementfield = form.querySelector("#" + id);
    var timeformat = elementfield.getAttribute('timeformat');
    var datemask = elementfield.getAttribute('dateformat');
    var value = elementfield.value;
    window.mask = true;

    var format = "";
    var formatTime = "";
    if (datemask !== null && !timeformat) {
        format = builddatemask(elementfield, datemask);
    }
    else {
        format = builddatemask(elementfield, datemask, timeformat);
    }


    // this is part of third party date time picker library which is raised for third party library acceptance workflow
    $("[name='" + form.name + "'] #" + id).datetimepicker({
        timepicker: this.timepicker,
        format: format,
        mask: this.mask,
        hours12: this.hours12,
        formatTime: this.formatTime,
        value: value
    });

}

//to format the date and time based on the input mask ex:DD-MM-YYYY 
function builddatemask(elementfield, dateformat, timeformat) {
    var format = "";
    if (timeformat) {
        window.timepicker = true;
        if (timeformat === "12h") {
            window.hours12 = true;
            dateformat += " h:i",
                formatTime = " h:i"
        }
        else {
            window.hours12 = false;
            dateformat += " H:i";
            formatTime = " H:i"
        }
    }
    else {
        window.timepicker = false;
    }
    //change date format
    if (dateformat.indexOf("DD") != -1) {
        format = dateformat.replace("DD", 'd');
        dateformat = format;
    }
    else if (dateformat.indexOf("dd") != -1) {
        format = dateformat.replace("dd", 'd');
        dateformat = format;
    }
    //change month format
    if (dateformat.indexOf("MMM") != -1 || dateformat.indexOf("mmm") != -1) {
        if (dateformat.indexOf("mmm") != -1) {
            format = dateformat.replace("mmm", 'M');
        }
        else {
            format = dateformat.replace("MMM", 'M');
        }
        //restricting user by not allowing to enter anything by setting readonly property if month format is MMM or mmm , in this case date can be selected only through the calendar.
        window.mask = false;
        elementfield.setAttribute('readonly', 'readonly');
        dateformat = format;
    }
    else if (dateformat.indexOf("MM") != -1) {
        format = dateformat.replace("MM", 'm');
        dateformat = format;
    }
    else if (dateformat.indexOf("mm") != -1) {
        format = dateformat.replace("mm", 'm');
        dateformat = format;
    }
    //change Year Format
    if (dateformat.indexOf("YYYY") != -1) {
        format = dateformat.replace("YYYY", 'Y');
        dateformat = format;
    }
    else if (dateformat.indexOf("yyyy") != -1) {
        format = dateformat.replace("yyyy", 'Y');
        dateformat = format;
    }
    else if (dateformat.indexOf("YY") != -1) {
        format = dateformat.replace("YY", "y");
        dateformat = format;
    }
    else if (dateformat.indexOf("yy") != -1) {
        format = dateformat.replace("yy", "y");
        dateformat = format;
    }
    return format;
}
function focusElement(formName) {
    setTimeout("document.forms['" + formName + "'].elements[0].focus()", 0);
}
 
 
   
   

