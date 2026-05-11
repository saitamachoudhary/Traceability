/**
 * Utility to download table data as a CSV file (Excel compatible).
 * @param {Array} columns - Array of column objects with colName property.
 * @param {Array} data - Array of arrays containing row data.
 * @param {string} filename - Name of the file to be saved.
 */
export const downloadExcel = (columns, data, filename = 'Enquiry_To_Offer_Data.csv') => {
    if (!columns || !data || data.length === 0) return;

    // Extract column headers
    const headers = columns.map(col => col.colName).join(',');

    // Extract row data
    const rows = data.map(row => {
        return row.map(cell => {
            // Handle null/undefined and escape commas
            const val = (cell === null || cell === undefined) ? '' : String(cell);
            return `"${val.replace(/"/g, '""')}"`;
        }).join(',');
    }).join('\n');

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
