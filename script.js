
/* Script pour lire le fichier et afficher les données */

document.getElementById('input-excel').addEventListener('change', handleFile, false);

function handleFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        displayTable(json);
    };
    reader.readAsArrayBuffer(file);
}

function displayTable(data) {
    const output = document.getElementById('output');
    let html = '<table border="1"><thead><tr>';

    // Ajouter les en-têtes de colonne
    data[0].forEach(header => {
        html += `<th>${header}</th>`;
    });

    html += '</tr></thead><tbody>';

    // Ajouter les lignes de données
    for (let i = 1; i < data.length; i++) {
        html += '<tr>';
        data[i].forEach(cell => {
            html += `<td>${cell}</td>`;
        });
        html += '</tr>';
    }

    html += '</tbody></table>';
    output.innerHTML = html;
}

