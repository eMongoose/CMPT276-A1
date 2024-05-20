

i = 3;
function addRow() {
    var table = document.getElementById("table"); // get ID of the table 
    var row = table.insertRow(-1); // insert row at the end of the table

    // add boxes for corresponding headers
    var name = row.insertCell(0);
    var shortName = row.insertCell(1);
    var weight = row.insertCell(2);
    var grade = row.insertCell(3);

    // add activity name and shortname with corresponding number to new row
    name.innerHTML = "Activity " + i;
    shortName.innerHTML = "A" + i;

    // add input text box to weight column
    var weightInput = document.createElement("input");
    weightInput.type = "text";
    weight.appendChild(weightInput);

    // declare divider for grade
    var divider = document.createElement("divisor");

    // grade box
    // add numerator input box
    var numerator = document.createElement("input");
    numerator.type = "text";
    grade.appendChild(numerator);

    // add divider
    divider.appendChild(document.createTextNode(" / "));

    // add denominator input box
    var denominator = document.createElement("input");
    denominator.type = "text";
    divider.appendChild(denominator);

    grade.appendChild(divider);


    i++; // increment value
}
