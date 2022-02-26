$(document).ready(async function() {
    const boxingCategories = await getRemoteData();
    updateTable(boxingCategories);
});

/**
 * Fetch boxying categories from API and return result or empty array.
 * @returns An array of boxing categories. Non-null.
 */
async function getRemoteData() {
    const response = await fetch('https://www.justcode.com/dataservice/api/boxingCategory/list');
    if (response && response.ok) {
        return response.json();
    }
    return [];
}

function updateTable(boxingCategories) {
    const tableBody = document.querySelector('#mytable tbody');
    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = '';

    boxingCategories.forEach(category => {
        const row = document.createElement('tr');

        const cellId = document.createElement('td');
        cellId.innerText = category.id;
        const cellCategoryName = document.createElement('td');
        cellCategoryName.innerText = category.categoryName;
        const cellUpperLimitInPound = document.createElement('td');
        cellUpperLimitInPound.innerText = category.upperLimitInPound;
        const cellUpperLimitInKG = document.createElement('td');
        cellUpperLimitInKG.innerText = category.upperLimitInKG;
        const cellModifiedOn = document.createElement('td');
        // TODO: Use library to parse date string, and display localized date/time
        cellModifiedOn.innerText = category.modifiedOn;

        row.append(cellId);
        row.append(cellCategoryName);
        row.append(cellUpperLimitInPound);
        row.append(cellUpperLimitInKG);
        row.append(cellModifiedOn);

        tableBody.appendChild(row);
    });
}