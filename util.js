const fs = require("fs");
const path = require("path");

function mkdirsSync(dirPath) {
  if (fs.existsSync(dirPath)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirPath))) {
      fs.mkdirSync(dirPath);
      return true;
    }
  }
}
function toWXForm(arr) {
  return arr
    .map(item => {
      return JSON.stringify(item);
    })
    .join("\n");
}
module.exports = {
  readJSON(path) {
    let file = fs.readFileSync(path, "utf8").trim();
    return JSON.parse(file);
  },
  writeFile(dirPath, fileName, ext) {
    mkdirsSync(dirPath);
    return fs.createWriteStream(dirPath + fileName + "." + ext);
  },
  JSONArr2WXForm(JSONFrom, destination, fileName) {
    let JSONArr = this.readJSON(JSONFrom);
    this.writeFile(destination, fileName, "json").write(toWXForm(JSONArr));
  },
  formatString2JSON(string) {
    return string.substring(string.indexOf("{"), string.lastIndexOf("}") + 1);
  },
  arrValid(arr) {
    return arr.filter(ele => ele);
  }
};
