const XLSX = require("xlsx");

const readExcelFile = (filePath) => {
    const workbook = XLSX.readFile(filePath);

    const sheetNames = workbook.SheetNames;

    if (!sheetNames.length) {
        throw new Error("The Excel file contains no worksheets.");
    }

    const firstSheet = workbook.Sheets[sheetNames[0]];

    const rows = XLSX.utils.sheet_to_json(firstSheet, {
        header: 1,
        defval: ""
    });

    if (!rows.length) {
        throw new Error("The Excel worksheet is empty.");
    }

    const headers = rows[0].map(header => String(header).trim());

    const data = rows.slice(1);

    return {
        sheetName: sheetNames[0],
        headers,
        data
    };
};

const mergeExcelFiles = (files) => {
    const workbooks = files.map(file => {
        return readExcelFile(file.path);
    });

    const headers = workbooks[0].headers;

    const mergedData = workbooks.flatMap(workbook => workbook.data);

    const worksheetData = [
        headers,
        ...mergedData
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Combined"
    );

    return workbook;
};

module.exports = {
    readExcelFile,
    mergeExcelFiles
};