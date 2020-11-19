const fs = require("fs").promises;

class ZipToLatLong{
    convert(input){
        return fs.readFile("us-zip-code-latitude-and-longitude.csv", "utf-8")
        .then((text) => {
            // Search text for the zip code
            // make regex for the zip code
            let zip = new RegExp(`[^.]${input};`);
            // find entry that matches regex
            let match = zip.exec(text);
            // get the whole line by going from the matched index to the end of the line
            let line = "";
            for(let i = match.index; text[i] !== '\r'; i++){
                line += text[i];
            }
            // Break up the line into chunks
            let chunks = line.split(';');
            
            // The last chunk is lat,long
            let [latitude, longitude] = chunks[chunks.length - 1].split(',');
            return [latitude, longitude];
        }).catch((err)=>{
            console.log(err);
        });
    }
}

module.exports.ZipToLatLong = ZipToLatLong;
