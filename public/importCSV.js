const fast_csv = require('fast_csv')
const fs = require('fs')

if (input.files) {
    function readImage(input) {
        if (input.files) {
            let lineNumber = 0
            let batch = []
            let batchId = 0
            let headers = ["id", "name", "description", "createdAt"]

            readStream
            // set customer headers to deal with duplicate header names and skip the first row (which has the headers)
                .pipe(parse({ headers, skipRows: 1 }))
                .on("data", (row) => {
                    batch.push(row);
                    lineNumber++;
                    // if batch full insert to database

                    // do not await the insert, let it work in the background
                    advisors.insertMany(batch, batchId);
                    batch = [];
                    batchId++;

                    // grab for n rows of large file.
                    if (lineNumber >= rowLimit) {
                        readStream.pause();
                        // this will continue to log some rows after the limit, buffer still picks up data after pause?
                        console.log(
                            `Read stream has been paused at line ${lineNumber} at ${new Date().toLocaleTimeString()}`
                        );

                        //readStream.destroy() // doesn't trigger on close or finish, is it because of the doWork async function?
                    }
                })

            .on("error", function(err) {
                    console.log("Error while reading file.", err);
                })
                .on("end", function() {
                    console.log(`Read ${lineNumber} lines`);

                    // check if anything is left over (odd lots) in batch
                    console.log(`left in batch: ${batch.length}`);
                    if (batch.length) doWork(batch, batchId);
                })
                .on("finish", function() {
                    console.log(`on Finish`);

                    // check if anything is left over (odd lots) in batch
                    console.log(`left in batch: ${batch.length}`);
                    if (batch.length) doWork(batch, batchId);
                })
                .on("close", function() {
                    console.log(`on Close`);

                    // check if anything is left over (odd lots) in batch
                    console.log(`left in batch: ${batch.length}`);
                    if (batch.length) doWork(batch, batchId);
                })
        }
        process(4, 4)
    }