const request = require("request");
const iconv = require("iconv-lite");
const analyze = require("./analyze");
const util = require("./util");

module.exports = {
  reqInfo(hero_id) {
    request(
      `http://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero_id}/${hero_id}.jpg`
    ).pipe(util.writeFile(`./hero/images/heroimg/`, `${hero_id}`, "jpg"));
    request(
      `http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/${hero_id}/${hero_id}-bigskin-1.jpg`
    ).pipe(util.writeFile(`./hero/images/bigskin/`, `${hero_id}`, "jpg"));
    request(`http://pvp.qq.com/web201605/herodetail/m/${hero_id}.html`).on(
      "response",
      function(res) {
        let chunks = [];
        res.on("data", function(chunk) {
          chunks = chunks.concat(chunk);
        });
        res.on("end", function() {
          let buf = Buffer.concat(chunks);
          let html = iconv.decode(buf, "gbk");
          let hero = analyze.analyze(html, hero_id);
          util
            .writeFile(`./hero/info/${hero_id}/info/`, `${hero_id}`, "json")
            .write(JSON.stringify(hero));
        });
      }
    );
  },
  reqFullHeroInfo() {
    let herolist = util.readJSON("./data/herolist.json");
    let heroes = [];
    Promise.all(
      herolist.map(function(hero) {
        return new Promise(function(resolve, reject) {
          let ename = hero.ename;
          request(`http://pvp.qq.com/web201605/herodetail/m/${ename}.html`).on(
            "response",
            function(res) {
              let chunks = [];
              res.on("data", function(chunk) {
                chunks = chunks.concat(chunk);
              });
              res.on("end", function() {
                let buf = Buffer.concat(chunks);
                let html = iconv.decode(buf, "gbk");
                let hero = analyze.analyze(html, ename);
                heroes.push(hero);
                resolve();
              });
            }
          );
        });
      })
    ).then(function() {
      util
        .writeFile("./hero/", "heroInfo", "json")
        .write(JSON.stringify(heroes));
    });
  },
  reqFullHeroInfoInWXForm() {
    let herolist = util.readJSON("./data/herolist.json");
    let heroes = [];
    Promise.all(
      herolist.map(function(hero) {
        return new Promise(function(resolve, reject) {
          let ename = hero.ename;
          request(`http://pvp.qq.com/web201605/herodetail/m/${ename}.html`).on(
            "response",
            function(res) {
              let chunks = [];
              res.on("data", function(chunk) {
                chunks = chunks.concat(chunk);
              });
              res.on("end", function() {
                let buf = Buffer.concat(chunks);
                let html = iconv.decode(buf, "gbk");
                let hero = analyze.analyze(html, ename);
                heroes.push(JSON.stringify(hero));
                resolve();
              });
            }
          );
        });
      })
    ).then(function() {
      util
        .writeFile("./hero/", "heroInfoWXForm", "json")
        .write(heroes.join("\n"));
    });
  },
  reqFreeHero() {
    request(
      "http://pvp.qq.com/webplat/info/news_version3/15592/24091/24992/m15707/index.shtml"
    ).on("response", function(res) {
      let chunks = [];
      res.on("data", function(chunk) {
        chunks = chunks.concat(chunk);
      });
      res.on("end", function() {
        let buf = Buffer.concat(chunks);
        let content = iconv.decode(buf, "gbk");
        data = analyze.analyzeFreeHero(content)
        util.writeFile("./hero/", "FreeHeroIndexData", "json").write(data);
      });
    });
  },
  getLast3NewHeroes(herolistJsonArrFilePath) {
    let data = util.readJSON(herolistJsonArrFilePath);
    let index = data.length - 1;
    let herolist = [];
    for (let i = 0; i < 3; i++) {
      herolist.push(data[index - i]);
    }
    let obj = {
      last3NewHeroes: herolist
    };
    util
      .writeFile("./hero/", `last3NewHeroes`, "json")
      .write(JSON.stringify(obj));
  },
  getHotHero() {
    request(
      "https://pvp.ingame.qq.com/php/ingame/smoba/top_heros.php?partition=1119&roleid=90876401&area=1&physicalID=1&algorithm=v2&version=2.14.6a&timestamp=1493112232746&appid=1104466820&sig=11a92c24e8f0d1fc74e31bb8c5203a09&encode=2&msdkEncodeParam=E5CB3C064B7A772867B1B552594434FCA26621A002CCB5AF47407E70297E2D6EE7962AC5C4D05234943B0144EDFBDCC4C2A285820C8983E5DE4E22B38EF167CCCA62220D5B3FF8BF83283431B8FF17FB790EDAA0932201873DEC7556F3CFF3AD325B51D6FF5A451618921BA48FF6818B53191FA3C7ED56E51021350FDC66A01CB44BB53178F3C501&game=smoba&start=1&num=10&ordertype=1&filter=0&grade=-1&herotype=0&matchtype=2&_=1557978524720&callback=jsonp1"
    ).on("response", function(res) {
      let chunks = [];
      res.on("data", function(chunk) {
        chunks = chunks.concat(chunk);
      });
      res.on("end", function() {
        let html = Buffer.concat(chunks);
        let obj = JSON.parse(util.formatString2JSON(html.toString()));
        util
          .writeFile("./hero/", "hotHero", "json")
          .write(JSON.stringify(obj.data.herolist));
      });
    });
  },
  getNewVideoes() {
    for (let i = 1; i <= 30; i++) {
      request(
        `https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchNewsKeywordsList&order=sIdxTime&r0=cors&r1=NewsObj&type=iType&source=app_news_search&pagesize=4&page=${i}`
      ).pipe(util.writeFile())
    }
  }
};
