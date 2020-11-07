const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const Excel = require('exceljs');

function print() {
    console.log.apply(null, arguments);
}

(async function main() {
    print("Starting Conversion...");

    const { i: inputDir } = argv;
    const { o: outputDir = 'result.xlsx' } = argv;
    const { k: keyConnector = '.' } = argv;
    const { u: uglify = false } = argv;

    try {
        if (typeof argv.i === "undefined") {
            throw new Error("Input Source missing.");
        }

        const sourceBuffer = await fs.promises.readFile(inputDir);
        const sourceText = sourceBuffer.toString();
        const sourceData = JSON.parse(sourceText);

        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("Converted");

        const rootKeys = Object.keys(sourceData);
        let rowCount = 1;
        
        for (let currentKey of rootKeys) {
            let currentCategoryObject = sourceData[currentKey];
            const innerKeys = Object.keys(currentCategoryObject);

            // TODO: HANDLE ARRAY!

            for (let currentInnerKey of innerKeys) {
                const row = worksheet.getRow(rowCount);
                // TODO: SUPPORT CUSTOMIZED KEY CONNECTOR
                row.getCell(1).value = `${currentKey}.${currentInnerKey}`;
                row.getCell(2).value = currentCategoryObject[currentInnerKey];

                rowCount += 1;
            }
        }

        worksheet.getColumn(1).width = 50;
        worksheet.getColumn(2).width = 300;

        await workbook.xlsx.writeFile(outputDir);

        print("Conversion completed. Please check your output directory.");
        print("Written as: " + outputDir);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();