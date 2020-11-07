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

        function parseAndWrite(parentKey, targetObject) {
            const keys = Object.keys(targetObject);

            for (let key of keys) {
                const element = targetObject[key];

                if (typeof element === 'object' && element !== null) {
                    let writeKey;

                    if (parentKey !== null) {
                        writeKey = addKeyConnectors(parentKey, key);
                    }
                    else {
                        writeKey = key;
                    }

                    parseAndWrite(writeKey, element);
                }
                else if (Array.isArray(element)) {
                    for (let i = 0; i < element.length; i++) {
                        let writeKey;

                        if (parentKey !== null) {
                            writeKey = addKeyConnectors(parentKey, key, i);
                        }
                        else {
                            writeKey = key;
                        }

                        write(writeKey, element[i]);
                    }
                }
                else {
                    let writeKey;

                    if (parentKey !== null) {
                        writeKey = addKeyConnectors(parentKey, key);
                    }
                    else {
                        writeKey = key;
                    }

                    write(writeKey, element);
                }
            }
        }

        function write(key, value) {
            const row = worksheet.getRow(rowCount);

            row.getCell(1).value = key;
            row.getCell(2).value = value.toString(); // There's a glitch that number displays nothing

            rowCount += 1;
        }

        function addKeyConnectors() {
            // arguments is not an Array, it's Array-Like. So convert it to the array.
            return [].slice.call(arguments).join(keyConnector);
        }

        parseAndWrite(null, sourceData);

        worksheet.getColumn(1).width = 50;
        worksheet.getColumn(2).width = 200;

        await workbook.xlsx.writeFile(outputDir);

        print("Conversion completed. Please check your output directory.");
        print("Written as: " + outputDir);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();