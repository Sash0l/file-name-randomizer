const inputFolder = './input/';
const outputFolder = './output/';
import { readdir, renameSync, writeFileSync } from 'fs';
import { extname } from 'path';

console.log("Starting file shuffling...");
readdir(inputFolder, (err, files) => {
    if(err) {
        return console.log(err);
    }

    console.log("Started file reading");

    let fileCount = files.length;

    console.log("File count:", fileCount);

    let randNums = [];
    for(let i = 0; i < files.length; i++) {
        randNums.push(i);
    }
    shuffle(randNums);
    shuffle(randNums);

    let fileNameMap = "";

    randNums.forEach((number, index) => {
        let file = files[number];
        let fileExtension = extname(`${inputFolder}${file}`);
        
        fileNameMap += `${index} : ${file}\n`;
        renameSync(`${inputFolder}${file}`,`${outputFolder}${index}${fileExtension}`);
    });

    writeFileSync(`${outputFolder}fileMap.txt`, fileNameMap);

    console.log("Done!");
});

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
