
function getCookie(cookieName) {
    var cookieString = "" + document.cookie;

    var index1 = cookieString.indexOf(cookieName + '=');

    if (index1 == -1 || cookieName == "")
        return "";
    var index2 = cookieString.indexOf(';', index1);

    if (index2 == -1)
        index2 = cookieString.length;

    return unescape(cookieString.substring(index1 + cookieName.length + 1, index2));
}

function setCookie(name, value) {
    cookieString = name + "=" + escape(value) + ";EXPIRES=-1";
    document.cookie = cookieString;

    if (getCookie(name))
        return false;
    else
        return true;
}

function showPdf() {
    document.getElementById('PDFGen').value = 1;
    document.getElementById('CalcForm').target = '_blank';
    document.getElementById('CalcForm').submit();
    document.getElementById('CalcForm').target = '';
    document.getElementById('PDFGen').value = 0;
}

function sendPdfOnOff(isSetManually) {
    pdfEmailCtrl = document.getElementById('PDFEmail');
    pdfEmailToCtrl = document.getElementById('PDFEmailTo');
    pdfEmailNameCtrl = document.getElementById('PDFEmailName');
    pdfEmailPhoneCtrl = document.getElementById('PDFEmailPhone');

    pdfEmailToCtrl.disabled = !pdfEmailCtrl.checked;
    pdfEmailNameCtrl.disabled = !pdfEmailCtrl.checked;
    pdfEmailPhoneCtrl.disabled = !pdfEmailCtrl.checked;

    if (pdfEmailCtrl.checked && isSetManually)
        pdfEmailToCtrl.focus();
}

function saveFormChanges(idx) {
    pdfEmailCtrl = document.getElementById('PDFEmail');
    pdfEmailToCtrl = document.getElementById('PDFEmailTo');
    pdfEmailNameCtrl = document.getElementById('PDFEmailName');
    pdfEmailPhoneCtrl = document.getElementById('PDFEmailPhone');

    if (pdfEmailToCtrl != null) {
        setCookie('pdfEmail', pdfEmailCtrl.checked);
        setCookie('pdfEmailTo', pdfEmailToCtrl.value);
        setCookie('pdfEmailName', pdfEmailNameCtrl.value);
        setCookie('pdfEmailPhone', pdfEmailPhoneCtrl.value);

        /*if (pdfEmailNameCtrl.value.length == 0)
        {
            alert('Your name must not be empty');
            pdfEmailNameCtrl.focus();
        	
            return false;
        }*/

        if (pdfEmailCtrl.checked == true && pdfEmailToCtrl.value.length == 0) {
            alert('E-mail address must not be empty');
            pdfEmailToCtrl.focus();

            return false;
        }

        /*if (pdfEmailPhoneCtrl.value.length == 0)
        {
            alert('Phone number must not be empty');
            pdfEmailPhoneCtrl.focus();
        	
            return;
        }*/

        document.getElementById('PDFEmail').value = 1;

        if (idx) {
            submitCalc();
            return false;
        } else {
            document.getElementById('CalcForm').submit();
            document.getElementById('CalcForm').target = '';
            document.getElementById('PDFEmail').value = 0;
        }
    }

    if (idx) {
        submitCalc();
        return false;
    }
}

function setEmailOptions() {
    pdfEmailCtrl = document.getElementById('PDFEmail');
    pdfEmailToCtrl = document.getElementById('PDFEmailTo');
    pdfEmailNameCtrl = document.getElementById('PDFEmailName');
    pdfEmailPhoneCtrl = document.getElementById('PDFEmailPhone');

    if (pdfEmailCtrl != null)
        pdfEmailCtrl.checked = (getCookie('pdfEmail') == 'true') ? 1 : 0;

    if (pdfEmailToCtrl != null)
        pdfEmailToCtrl.value = getCookie('pdfEmailTo');

    if (pdfEmailPhoneCtrl != null)
        pdfEmailPhoneCtrl.value = getCookie('pdfEmailPhone');

    if (pdfEmailNameCtrl != null)
        pdfEmailNameCtrl.value = getCookie('pdfEmailName');

    sendPdfOnOff(false);
}

function switchToPlainEnglish() {
    var analysisDiv = document.getElementById('analysisDiv');
    var englishDiv = document.getElementById('plainEnglishDiv');

    analysisDiv.style.display = 'none';
    englishDiv.style.display = 'inline';

    setCookie('CalcHelp', 2);
}

function switchToAnalysis() {
    var analysisDiv = document.getElementById('analysisDiv');
    var englishDiv = document.getElementById('plainEnglishDiv');

    analysisDiv.style.display = 'inline';
    englishDiv.style.display = 'none';

    setCookie('CalcHelp', 1);
}
