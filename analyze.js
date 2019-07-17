const cheerio = require("cheerio");
const util = require("./util");

module.exports = {
  analyze(html, hero_id) {
    let $ = cheerio.load(html, { decodeEntities: false });
    let hero = {
      ename: hero_id,
      difficulty: parseInt(
        $(".hero-attribute .cover-list .cnver4")
          .attr("class")
          .split(" ")
          .pop()
          .split("-")
          .pop()
      ),
      skill: parseInt(
        $(".hero-attribute .cover-list .cnver3")
          .attr("class")
          .split(" ")
          .pop()
          .split("-")
          .pop()
      ),
      viability: parseInt(
        $(".hero-attribute .cover-list .cnver1")
          .attr("class")
          .split(" ")
          .pop()
          .split("-")
          .pop()
      ),
      attack: parseInt(
        $(".hero-attribute .cover-list .cnver2")
          .attr("class")
          .split(" ")
          .pop()
          .split("-")
          .pop()
      ),
      skills: (function() {
        let arr = [];
        const amount = $(".plus-content").children().length - 1;
        for (let i = 0; i < amount; i++) {
          let skill = {
            id: parseInt(hero_id.toString() + i + "0"),
            name: $(`.plus-content li:nth-child(${i + 1}) .plus-name`).text(),
            value: $(`.plus-content li:nth-child(${i + 1}) .plus-value`).text(),
            description: $(
              `.plus-content li:nth-child(${i + 1}) .plus-int`
            ).text(),
            tip: $(`.plus-content li:nth-child(${i + 1}) .prompt`).text()
          };
          arr.push(skill);
        }
        return arr;
      })(),
      skillBuild: (() => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
          let id = parseInt(
            $(`.plus-osal .osal-box.sk${i + 1} .osal-p2`).attr("data-upskill")
          );
          arr.push(id);
        }
        return arr;
      })(),
      summoner: $("#skill3")
        .attr("data-skill")
        .split("|")
        .map(item => parseInt(item)),
      items: (() => {
        let arr = [];
        $(".skills-build").each((i, ele) => {
          let obj = {
            items: $(ele)
              .children(".build-list")
              .attr("data-item")
              .split("|")
              .map(item => parseInt(item)),
            tip: $(ele)
              .children(".prompt")
              .text()
          };
          arr.push(obj);
        });
        return arr;
      })(),
      ming: {
        items: $(".rune-list")
          .attr("data-ming")
          .split("|")
          .map(item => parseInt(item)),
        tip: $(".rune-list .prompt").text()
      },
      methods: {
        toUse: $(".use-skills")
          .eq(0)
          .text(),
        toLaning: $(".use-skills")
          .eq(1)
          .text(),
        toGB: $(".use-skills")
          .eq(2)
          .text()
      },
      relationships: {
        bestCompanies: (() => {
          let arr = [];
          $(".rela-list")
            .eq(0)
            .children()
            .each((i, ele) => {
              let obj = {
                id: parseInt(
                  /\/(\d+)\//g.exec(
                    $(ele)
                      .children("img")
                      .attr("src")
                  )[1]
                ),
                description: $(ele)
                  .children(".rela-text")
                  .text()
              };
              arr.push(obj);
            });
          return arr;
        })(),
        restrained: (() => {
          let arr = [];
          $(".rela-list")
            .eq(1)
            .children()
            .each((i, ele) => {
              let obj = {
                id: parseInt(
                  /\/(\d+)\//g.exec(
                    $(ele)
                      .children("img")
                      .attr("src")
                  )[1]
                ),
                description: $(ele)
                  .children(".rela-text")
                  .text()
              };
              arr.push(obj);
            });
          return arr;
        })(),
        restrain: (() => {
          let arr = [];
          $(".rela-list")
            .eq(2)
            .children()
            .each((i, ele) => {
              let obj = {
                id: parseInt(
                  /\/(\d+)\//g.exec(
                    $(ele)
                      .children("img")
                      .attr("src")
                  )[1]
                ),
                description: $(ele)
                  .children(".rela-text")
                  .text()
              };
              arr.push(obj);
            });
          return arr;
        })()
      }
    };
    return hero;
  },
  analyzeFreeHero(data) {
    data = data.substring(data.indexOf("["), data.lastIndexOf("]") + 1);
    let obj = JSON.parse(data)[1];
    let arr = util.arrValid(obj.sSubContent.split("|"));
    obj.sSubContent = arr.map(ele => parseInt(ele));
    return JSON.stringify(obj);
  }
};
