const XLSX = require("xlsx");

const {
    validateFiles,
    validateHeaders
} = require("../services/validation.service");

const {
    readExcelFile,
    mergeExcelFiles
} = require("../services/excel.service");

const {
    getOutputPath,
    deleteFile
} = require("../utils/file.utils");

const previewFiles = (req, res, next) => {
    try {
        validateFiles(req.files);

        const workbooks = req.files.map(file =>
            readExcelFile(file.path)
        );

        const headersList = workbooks.map(workbook =>
            workbook.headers
        );

        validateHeaders(headersList);

        const totalRows = workbooks.reduce(
            (total, workbook) => total + workbook.data.length,
            0
        );

        const preview = {
            files: workbooks.length,
            totalRows,
            columns: workbooks[0].headers.length,
            headers: workbooks[0].headers,
            sheets: workbooks.reduce(
                (total, workbook) => total + workbook.totalSheets,
                0
            ),
            filesDetails: workbooks.map((workbook, index) => ({
                fileName: req.files[index].originalname,
                sheet: workbook.sheetName,
                rows: workbook.data.length,
                columns: workbook.headers.length
            }))
        };

        req.files.forEach(file => {
            deleteFile(file.path);
        });

        res.status(200).json({
            success: true,
            message: "Files are ready to merge.",
            data: preview
        });

    } catch (error) {
        if (req.files) {
            req.files.forEach(file => {
                deleteFile(file.path);
            });
        }

        next(error);
    }
};

const mergeFiles = (req, res, next) => {
    try {
        validateFiles(req.files);

        const workbooks = req.files.map(file =>
            readExcelFile(file.path)
        );

        const headersList = workbooks.map(workbook =>
            workbook.headers
        );

        validateHeaders(headersList);

        const workbook = mergeExcelFiles(req.files);

        const output = getOutputPath();

        XLSX.writeFile(workbook, output.path);

        req.files.forEach(file => {
            deleteFile(file.path);
        });

        res.download(
            output.path,
            "Combined.xlsx",
            error => {
                deleteFile(output.path);

                if (error && !res.headersSent) {
                    next(error);
                }
            }
        );

    } catch (error) {
        if (req.files) {
            req.files.forEach(file => {
                deleteFile(file.path);
            });
        }

        next(error);
    }
};

module.exports = {
    previewFiles,
    mergeFiles
};