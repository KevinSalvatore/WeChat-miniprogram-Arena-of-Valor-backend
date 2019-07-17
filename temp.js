const request = require("request");
const util = require("./util");

request("http://mobile.yangkeduo.com").pipe(
  util.writeFile("./", "temp", "html")
);
