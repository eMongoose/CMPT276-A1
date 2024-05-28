
// declare table as a global variable
let table = document.getElementById('table').getElementsByTagName('tbody')[0];

// add initial rows
addRow();
addRow();

// event listeners
document.getElementById('addRow').addEventListener('click', addRow);
document.getElementById('mean').addEventListener('click', mean);
document.getElementById('weighted').addEventListener('click', weighted);

// reset table by reloading the page
document.getElementById('reset').addEventListener('click', function () {
    window.location.reload();
});

///////////////////////////////////////////////////////////////////////////
function addRow() {
    // Declare the rows
    let row = table.insertRow();

    // Keep track of rows
    let index = table.rows.length;

    let cell1 = row.insertCell(0); // name
    let cell2 = row.insertCell(1); // shortName
    let cell3 = row.insertCell(2); // weight
    let cell4 = row.insertCell(3); // grade
    let cell5 = row.insertCell(4); // percent
    ///////////////////////////////////////////////////////////////////////////
    // add content to cell 1 and cell 2
    cell1.innerHTML = 'Activity ' + index;
    cell2.innerHTML = 'A' + index;

    ///////////////////////////////////////////////////////////////////////////
    // add text box to weight cell
    let weightInput = document.createElement('input');
    weightInput.type = 'number';
    cell3.appendChild(weightInput);

    ///////////////////////////////////////////////////////////////////////////
    // grade cell
    // numerator
    let numerInput = document.createElement('input');
    numerInput.type = 'number';
    cell4.appendChild(numerInput);
    numerInput.addEventListener('input', () => updatePercent(row));

    // divider
    cell4.appendChild(document.createTextNode(' / '));

    // denominator
    let denomInput = document.createElement('input');
    denomInput.type = 'number';
    cell4.appendChild(denomInput);
    denomInput.addEventListener('input', () => updatePercent(row));

    let percent = document.createElement('span');
    cell5.appendChild(percent);
}
///////////////////////////////////////////////////////////////////////////
// update percent
function updatePercent(row) {
    // get the input from the row
    let inputs = row.getElementsByTagName('input');
    let numerator = parseFloat(inputs[1].value) || 0; // get the numerator
    let denominator = parseFloat(inputs[2].value) || 1; // get the denominator - avoid zeros

    // calculate the percent
    let percent = (numerator / denominator) * 100;
    // update the percent column 
    row.cells[4].firstChild.textContent = percent.toFixed(2) + '%';
}
///////////////////////////////////////////////////////////////////////////
function weighted() {
    // declare some variables
    let sum = 0;
    let totalWeights = 0;
    let rows = table.rows;

    // iterate through the table rows
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let inputs = row.getElementsByTagName('input'); // get the inputs
        let weight = parseFloat(inputs[0].value) || 1;
        let numerator = parseFloat(inputs[1].value) || 0;
        let denominator = parseFloat(inputs[2].value) || 1;

        // calculate the dividend and multiply it by the weight
        let total = numerator / denominator;
        sum += total * weight;

        // add it to the total
        totalWeights += weight;
    }

    // calculate the final and avoid dividing by zero
    let final = totalWeights > 0 ? (sum / totalWeights) * 100 : 0;
    displayResult(final, 1); // give the final number a precision of 1
}
///////////////////////////////////////////////////////////////////////////
function mean() {
    let sum = 0;
    let count = 0; // row counter
    let rows = table.rows;

    // iterate through the table rows
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let inputs = row.getElementsByTagName('input');
        let numerator = parseFloat(inputs[1].value) || 0;
        let denominator = parseFloat(inputs[2].value) || 1;

        // calculate the dividend and add it to the total
        let dividend = numerator / denominator;
        sum += dividend;
        count++; // increment the row counter
    }

    let final = count > 0 ? (sum / count) * 100 : 0;
    displayResult(final, 0);
}
///////////////////////////////////////////////////////////////////////////

function displayResult(finalResult, precision) {
    let displayFinal = document.getElementById('result');
    displayFinal.textContent = finalResult.toFixed(precision) + ' / 100';
}