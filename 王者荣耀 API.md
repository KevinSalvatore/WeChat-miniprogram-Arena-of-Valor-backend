# 王者荣耀 API

## 图片 API

- 英雄小头像：game.gtimg.cn/images/yxzj/img201606/heroimg/`ename`/`ename`.jpg
- 英雄大图：game.gtimg.cn/images/yxzj/img201606/skin/hero-info/`ename`/`ename`-bigskin-1.jpg
- 英雄技能图片：game.gtimg.cn/images/yxzj/img201606/heroimg/`ename`/`ename` `技能下标`.png
  - 技能下标
    - 00： 被动
    - 10：1技能
    - 20：...
- 召唤师技能图片：game.gtimg.cn/images/yxzj/img201606/summoner/`summoner_id`.jpg
- 装备图片：game.gtimg.cn/images/yxzj/img201606/itemimg/`item_id`.jpg
- 符文图片：game.gtimg.cn/images/yxzj/img201606/mingwen/`ming_id`.png

## 英雄资料

```json
{
  "ename": 506,
  "cname": "云中君",
  "title": "流云之翼",
  "new_type": 1,	//是否为新英雄
  "hero_type": 4,
  "hero_type2": 1,	//可能没有第二个英雄类型
  "skin_name":	"流云之翼|荷鲁斯之眼",	//管道符分隔
  "difficulty": 4,
  "skills": [
    {
      "id": "00",
      "name": "",
      "description": "",
      "tip": ""
    },{},{}],
  "skillBuild": [skill_id, skill_id],
  "summoner": [summoner_id, summoner_id],
  "attack": 9,
  "viability": 1,
  "items": {
    "advantage": {
      items: [item_id, item_id, item_id, item_id, item_id, item_id],
      "tip": ""
    },
    "disadvantage": {}
  },
  "ming": [ming_id, ming_id, ming_id],
  "methods": {
    "toUse": "",
    "toLaning": "",
    "toGB": ""
  },
  "relationships": {
    "bestCompanies": [
      {
        "id": ename,
        "description": ""
      }, {}],
    "restrained": [
      {
        "id": ename,
        "description": ""
      }, {}],
    "restrain": [
      {
        "id": ename,
        "description": ""
      }, {}]
  }
}
```

