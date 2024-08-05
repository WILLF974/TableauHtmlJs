const XLSX = require('xlsx');

/* Script pour lire le fichier et afficher les données */

document.getElementById('input-excel').addEventListener('change', handleFile, false);

function handleFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        displayData(json);
    };
    reader.readAsArrayBuffer(file);
}

function displayData(data) {
    const output = document.getElementById('output');
    output.textContent = JSON.stringify(data, null, 2);
}
