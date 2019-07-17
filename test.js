const request = require("request");
const iconv = require("iconv-lite");
const analyze = require("./analyze");
const util = require("./util");
const fs = require("fs");
const cheerio = require("cheerio");

// request(
//   "https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchKeywordsList&page=1&pagesize=30&order=sIdxTime&r0=cors&r1=userObj&type=iKeyword&source=app_search&id=2132,%202499,%202137,%202140,%202125,%202500,%202501,%202502,%202503,%202504,%202505,%202506"
// ).pipe(util.writeFile("./temp/", "d", "json"));

// let obj = JSON.parse(fs.readFileSync("./temp/d.json", "utf8").trim());
// let arr = [];
// obj.msg.result.forEach(item => {
//   let temp = {
//     iBiz: item.iBiz,
//     iVideoId: item.iVideoId
//   };
//   arr.push(temp);
// });
// util.writeFile("./temp/", "e", "json").write(JSON.stringify(arr));

let data = util.readJSON("./temp/e.json");
// data.forEach(item => {
//   request(
//     `https://apps.game.qq.com/wmp/v3.1/public/search.php?source=web_m&p0=${
//       item.iBiz
//     }&id=${item.iVideoId}&gicp_tk=5399&_=1558087048004`
//   ).pipe(util.writeFile("./temp/group/", `${item.iVideoId}`, "js"));
// });

let videoMap = [];

data.forEach(item => {
  let file = fs.readFileSync(`./temp/group/${item.iVideoId}.js`, "utf8").trim();
  file = file.substring(file.indexOf("{"), file.lastIndexOf("}") + 1);
  let obj = JSON.parse(file);
  let o = {
    iVideoId: item.iVideoId,
    sVID: obj.msg.sVID
  };
  videoMap.push(o);
});

util.writeFile("./temp/", "f", "json").write(JSON.stringify(videoMap));
