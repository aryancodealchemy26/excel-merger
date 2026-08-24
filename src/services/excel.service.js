const XLSX = require("xlsx");

const readExcelFile = (filePath) => {
    const workbook = XLSX.readFile(filePath);

    if (!workbook.SheetNames.length) {
        throw new Error("The Excel file contains no worksheets.");
    }

    const firstSheetName = workbook.SheetNames[0];
    const firstSheet = workbook.Sheets[firstSheetName];

    const rows = XLSX.utils.sheet_to_json(firstSheet, {
        header: 1,
        defval: ""
    });

    if (!rows.length) {
        throw new Error("The Excel worksheet is empty.");
    }

    const headers = rows[0].map(header => String(header).trim());

    const data = rows
        .slice(1)
        .filter(row =>
            row.some(cell => String(cell).trim() !== "")
        );

    return {
        sheetName: firstSheetName,
        headers,
        data,
        totalSheets: workbook.SheetNames.length,
        sheetNames: workbook.SheetNames
    };
};

const mergeExcelFiles = (files) => {
    const workbooks = files.map(file => readExcelFile(file.path));

    const headers = workbooks[0].headers;

    const mergedData = workbooks.flatMap(workbook => workbook.data);

    const worksheet = XLSX.utils.aoa_to_sheet([
        headers,
        ...mergedData
    ]);

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