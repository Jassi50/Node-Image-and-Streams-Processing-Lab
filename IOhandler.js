/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: 
 * Author: 
 * 
 */

const unzipper = require('unzipper'),
  // fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');
const fs = require("fs").promises;
const { createReadStream, createWriteStream } = require("fs");
// const fsc = require("fs");
// fsc.createReadStream();
// fsc.createWriteStream();

/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  fs.createReadStream('pathIn')
    .pipe(unzipper.Extract())
    .promise()
    .then(() => console.log('Extraction operation complete'), e => console.log('error', e));
};

unzip("myfile.zip", "unzipped");
/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */
const readDir = dir => {
  fs.promises.readdir(dir)
    .then(filenames => {
      for (let filename of filenames) {
        let ext = path.extname('filename');
        if (ext == ".png") {
          console.log(filename);
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
};

readDir("unzipped");
/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  fs.createReadStream("in.png")
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on("parsed", function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;

          // invert color
          this.data[idx] = 255 - this.data[idx];
          this.data[idx + 1] = 255 - this.data[idx + 1];
          this.data[idx + 2] = 255 - this.data[idx + 2];

          // and reduce opacity
          this.data[idx + 3] = this.data[idx + 3] >> 1;
        }
      }

      this.pack().pipe(fs.createWriteStream("out.png"));
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale
};