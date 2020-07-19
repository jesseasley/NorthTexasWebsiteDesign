var people = [];
$(document).ready(function () {
    draw_kubra_js_pi_widget();
});
class js_pi_Person {
    constructor(firstName, lastName) {
        this.fName = firstName;
        this.lName = lastName;
    }
    get firstName() {
        return this.fName;
    }
    get lastName() {
        return this.lName;
    }
    set firstName(data) {
        this.firstName = data;
    }
    set lastName(data) {
        this.lastName = data;
    }
}
function draw_kubra_js_pi_widget() {
    var style = $("" +
        "<style>"+
        "   .kubra_js_pi_background {\n" +
        $("#kubra_js-pi").attr("kubra_js-pi_plugin_style") + "\n" +
        "   }\n" +
        "   @media screen and (min-width: 768px) {\n" +
        "      body { font-size: 17px; }\n" +
        "   }\n" +
        "</style>");
    style.appendTo('head');
    var html = "" +
        "<div class='kubra_js_pi_background'>" +
        "   <center><b>" + $("#kubra_js-pi").attr("kubra_js-pi_clientName") +
        " (" + $("#kubra_js-pi").attr("kubra_js-pi_billerID") + ")</b></center><hr>" +
        "   <table border=0 style='width:100%;'>" +
        "      <tr>" +
        "         <th style='width:2px'></th>" +
        "         <th>First Name</th>" +
        "         <th>Last Name</th>" +
        "         <th style='width:2px'></th>" +
        "         </tr>";
    for (var i = 0; i < people.length; i++) {
        html += "" +
            "<tr>" +
            "   <td style='width:2px'></td>" +
            "   <td>" + people[i].firstName + "</td>" +
            "   <td>" + people[i].lastName + "</td>" +
            "   <td style='width:2px'></td>" +
            "</tr>";
    }
    html += "</table>" +
        "<hr>";
    html += "" +
        "<table style='width:100%;' >" +
        "   <tr>" +
        "      <td style='width:2px'></td>" +
        "      <th>First:</th>" +
        "      <td><input type='text' id='kubra_js_pi_txtFirstName' class='form-control'></td>" + 
        "      <td style='width:2px'>" +
        "   </tr>" +
        "   <tr>" +
        "      <td style='width:2px'></td>" +
        "      <th>Last:</th>" +
        "      <td><input type='text' id='kubra_js_pi_txtLastName' class='form-control'></td>" + 
        "      <td style='width:2px'></td>" +
        "   </tr>" +
        "   <tr>" +
        "      <td style='width:2px'></td>" +
        "      <td colspan=2>" +
        "         <input type='button' onclick='kubra_js_pi_btnClick();' value='Save' class='btn btn-primary pull-right'>" +
        "      </td>" + 
        "      <td style='width:2px'></td>" +
        "   </tr>" +
        "</table>";
    html += "</div>";
    $("#kubra_js-pi").html(html);
}
function kubra_js_pi_btnClick() {
    var person = new js_pi_Person($("#kubra_js_pi_txtFirstName").val(), $("#kubra_js_pi_txtLastName").val());
    people.push(person);
    draw_kubra_js_pi_widget();
}