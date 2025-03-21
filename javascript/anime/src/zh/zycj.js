const mangayomiSources = [{
    "name": "桃花资源",
    "lang": "zh",
    "baseUrl": "https://thzy1.me",
    "apiUrl": "thzy",
    "iconUrl": "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-zh/main/javascript/icon/zh.zycj.jpg",
    "typeSource": "single",
    "itemType": 1,
    "isNsfw": true,
    "version": "0.0.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "pkgPath": "anime/src/zh/zycj.js"
},
{
    "name": "百万资源",
    "lang": "zh",
    "baseUrl": "https://api.bwzym3u8.com",
    "apiUrl": "bwzy",
    "iconUrl": "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-zh/main/javascript/icon/zh.zycj.jpg",
    "typeSource": "single",
    "itemType": 1,
    "isNsfw": true,
    "version": "0.0.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "pkgPath": "anime/src/zh/zycj.js"
},
{
    "name": "U酷资源",
    "lang": "zh",
    "baseUrl": "https://api.ukuapi88.com",
    "apiUrl": "ukuzy",
    "iconUrl": "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-zh/main/javascript/icon/zh.zycj.jpg",
    "typeSource": "single",
    "itemType": 1,
    "isNsfw": false,
    "version": "0.0.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "pkgPath": "anime/src/zh/zycj.js"
},
{
    "name": "金鹰资源",
    "lang": "zh",
    "baseUrl": "https://jyzyapi.com",
    "apiUrl": "jyzy",
    "iconUrl": "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-zh/main/javascript/icon/zh.zycj.jpg",
    "typeSource": "single",
    "itemType": 1,
    "isNsfw": false,
    "version": "0.0.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "pkgPath": "anime/src/zh/zycj.js"
},
{
    "name": "卧龙资源",
    "lang": "zh",
    "baseUrl": "https://collect.wolongzyw.com",
    "apiUrl": "wlzy",
    "iconUrl": "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-zh/main/javascript/icon/zh.zycj.jpg",
    "typeSource": "single",
    "itemType": 1,
    "isNsfw": false,
    "version": "0.0.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "pkgPath": "anime/src/zh/zycj.js"
},
{
    "name": "91麻豆",
    "lang": "zh",
    "baseUrl": "https://91md.me",
    "apiUrl": "91md",
    "iconUrl": "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-zh/main/javascript/icon/zh.zycj.jpg",
    "typeSource": "single",
    "itemType": 1,
    "isNsfw": true,
    "version": "0.0.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "pkgPath": "anime/src/zh/zycj.js"
},
{
    "name": "LSB资源",
    "lang": "zh",
    "baseUrl": "https://apilsbzy1.com",
    "apiUrl": "lsbzy",
    "iconUrl": "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-zh/main/javascript/icon/zh.zycj.jpg",
    "typeSource": "single",
    "itemType": 1,
    "isNsfw": true,
    "version": "0.0.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "pkgPath": "anime/src/zh/zycj.js"
}];

class DefaultExtension extends MProvider {
    source_categories = {
        "thzy": [{"value":"27","name":"主播网红"},{"value":"25","name":"日本无码"},{"value":"26","name":"日本有码"},{"value":"28","name":"日本素人"},{"value":"9","name":"欧美"},{"value":"10","name":"禁漫"},{"value":"23","name":"乱伦"},{"value":"24","name":"探花"},{"value":"22","name":"学生"},{"value":"6","name":"国产精品"},{"value":"7","name":"华语AV"},{"value":"8","name":"黑料吃瓜"}],
        "bwzy": [{"value":"31","name":"视频一区"},{"value":"32","name":"国产视频"},{"value":"33","name":"国产主播"},{"value":"34","name":"91大神"},{"value":"35","name":"热门事件"},{"value":"36","name":"传媒自拍"},{"value":"37","name":"视频二区"},{"value":"38","name":"日本有码"},{"value":"39","name":"日本无码"},{"value":"40","name":"韩国主播"},{"value":"41","name":"动漫肉番"},{"value":"42","name":"女同性恋"}],
        "ukuzy": [{"value":"1","name":"电影"},{"value":"2","name":"电视剧"},{"value":"3","name":"综艺"},{"value":"4","name":"动漫"},{"value":"6","name":"动作片"},{"value":"7","name":"喜剧片"},{"value":"8","name":"爱情片"},{"value":"9","name":"科幻片"},{"value":"10","name":"恐怖片"},{"value":"11","name":"剧情片"},{"value":"12","name":"战争片"},{"value":"13","name":"国产剧"},{"value":"14","name":"港澳剧"},{"value":"15","name":"日剧"},{"value":"16","name":"欧美剧"},{"value":"20","name":"动漫电影"},{"value":"21","name":"台湾剧"},{"value":"22","name":"韩剧"},{"value":"23","name":"泰剧"},{"value":"24","name":"记录片"},{"value":"25","name":"伦理片"},{"value":"26","name":"资讯"},{"value":"27","name":"新闻资讯"},{"value":"28","name":"预告资讯"},{"value":"30","name":"影视资讯"},{"value":"31","name":"明星资讯"},{"value":"32","name":"短剧"},{"value":"33","name":"奇幻片"},{"value":"34","name":"犯罪片"}],
        "jyzy": [{"value":"1","name":"电视剧"},{"value":"2","name":"电影"},{"value":"3","name":"欧美剧"},{"value":"4","name":"香港剧"},{"value":"5","name":"韩剧"},{"value":"6","name":"日剧"},{"value":"7","name":"马泰剧"},{"value":"8","name":"伦理片"},{"value":"9","name":"动作片"},{"value":"10","name":"爱情片"},{"value":"11","name":"喜剧片"},{"value":"12","name":"科幻片"},{"value":"13","name":"恐怖片"},{"value":"14","name":"剧情片"},{"value":"15","name":"战争片"},{"value":"16","name":"记录片"},{"value":"17","name":"动漫"},{"value":"20","name":"内地剧"},{"value":"23","name":"动画片"},{"value":"24","name":"中国动漫"},{"value":"25","name":"日本动漫"},{"value":"26","name":"欧美动漫"},{"value":"27","name":"综艺"},{"value":"28","name":"台湾剧"},{"value":"29","name":"体育赛事"},{"value":"30","name":"短剧"}],
        "wlzy": [{"value":"1","name":"电影片"},{"value":"2","name":"连续剧"},{"value":"3","name":"综艺片"},{"value":"4","name":"动漫片"},{"value":"5","name":"动作片"},{"value":"6","name":"喜剧片"},{"value":"7","name":"爱情片"},{"value":"8","name":"科幻片"},{"value":"9","name":"恐怖片"},{"value":"10","name":"剧情片"},{"value":"11","name":"战争片"},{"value":"12","name":"国产剧"},{"value":"13","name":"香港剧"},{"value":"14","name":"韩国剧"},{"value":"15","name":"欧美剧"},{"value":"16","name":"台湾剧"},{"value":"17","name":"日本剧"},{"value":"18","name":"海外剧"},{"value":"22","name":"记录片"},{"value":"23","name":"短片"},{"value":"24","name":"动画片"},{"value":"25","name":"国产动漫"},{"value":"26","name":"欧美动漫"},{"value":"27","name":"日本动漫"},{"value":"30","name":"港台综艺"},{"value":"31","name":"韩国综艺"},{"value":"32","name":"大陆综艺"},{"value":"33","name":"泰国剧"},{"value":"37","name":"欧美综艺"},{"value":"38","name":"电影解说"},{"value":"39","name":"惊悚片"},{"value":"42","name":"家庭片"},{"value":"43","name":"古装片"},{"value":"44","name":"历史片"},{"value":"45","name":"悬疑片"},{"value":"46","name":"犯罪片"},{"value":"48","name":"篮球"},{"value":"49","name":"伦理片"},{"value":"51","name":"足球"},{"value":"54","name":"短剧"}],
        "91md": [{"value":"1","name":"麻豆视频"},{"value":"2","name":"91制片厂"},{"value":"3","name":"天美传媒"},{"value":"4","name":"蜜桃传媒"},{"value":"5","name":"皇家华人"},{"value":"6","name":"星空传媒"},{"value":"7","name":"精东影业"},{"value":"8","name":"乐播传媒"},{"value":"9","name":"成人头条"},{"value":"10","name":"乌鸦传媒"},{"value":"20","name":"兔子先生"},{"value":"21","name":"杏吧原创"},{"value":"22","name":"玩偶姐姐"},{"value":"23","name":"mini传媒"},{"value":"24","name":"大象传媒"},{"value":"25","name":"开心鬼传媒"},{"value":"26","name":"PsychoPorn"},{"value":"27","name":"糖心Vlog"},{"value":"29","name":"萝莉社"},{"value":"30","name":"性视界"}],
        "lsbzy": [{"value":"24","name":"视频一区"},{"value":"25","name":"视频二区"},{"value":"26","name":"亚洲有码"},{"value":"27","name":"亚洲无码"},{"value":"28","name":"制服诱惑"},{"value":"29","name":"强奸乱伦"},{"value":"30","name":"巨乳美乳"},{"value":"31","name":"明星换脸"},{"value":"32","name":"中文字幕"},{"value":"33","name":"角色扮演"},{"value":"34","name":"日本女优"},{"value":"35","name":"成人动漫"},{"value":"36","name":"欧美激情"},{"value":"37","name":"三级片"},{"value":"38","name":"网曝视频"},{"value":"39","name":"AV解说"},{"value":"40","name":"国产传媒"},{"value":"41","name":"主播直播"},{"value":"42","name":"国产精品"},{"value":"43","name":"国产探花"},{"value":"44","name":"视频三区"},{"value":"46","name":"国产乱伦"},{"value":"47","name":"国产丝袜"},{"value":"48","name":"国产SM"},{"value":"49","name":"国产人妻"},{"value":"50","name":"自拍偷拍"},{"value":"51","name":"同性恋"}],
    };
    baseURL() {
        const preference = new SharedPreferences();
        const custom = preference.get("domain_url");
        if (custom.length == 0) {
            return this.source.baseUrl;
        }
        if (custom.endsWith("/")) {
            return custom.slice(0, -1);
        }
        return custom;
    }
    getKey() {
        return this.source.apiUrl;
    }
    async request(url) {
        const source_url = this.baseURL();
        return await new Client().get(`${source_url}/api.php/provide/vod?ac=detail${url}`, { "Referer": source_url });
    }
    async parseData(url) {
        const res = await this.request(url);
        const datas = JSON.parse(res.body);
        const results = [];
        for (let data of datas.list) {
            results.push({
                link: data.vod_id.toString(),
                imageUrl: data.vod_pic,
                name: data.vod_name
            })
        }
        return { list: results, hasNextPage: true };
    }
    getHeaders(url) {
        throw new Error("getHeaders not implemented");
    }
    async getPopular(page) {
        return await this.parseData("&pg=" + page.toString());
    }
    async getLatestUpdates(page) {
        const h = (new Date().getUTCHours() + 9) % 24;
        return await this.parseData(`&pg=${page}&h=${h || 24}`);
    }
    async search(query, page, filters) {
        let category = "";
        if (filters.length > 0) {
            category = filters[0].values[filters[0].state].value;
            if (category != "") {
                category = "&t=" + category;
            }
        }
        return await this.parseData(`&wd=${query}${category}&pg=${page}`);
    }
    async getDetail(url) {
        const res = await this.request("&ids=" + url);
        const data = JSON.parse(res.body).list[0];
        const description = data.vod_blurb;
        let play_urls = data.vod_play_url;
        if ((data.vod_play_note != "") && (play_urls.includes(data.vod_play_note))) {
            play_urls = play_urls.split(data.vod_play_note)[1];
        }
        play_urls = play_urls.split("#");
        const episodes = [];
        for (let play_url of play_urls) {
            const info = play_url.split("$");
            episodes.push({
                name: info[0],
                url: info[1]
            })
        }
        episodes.reverse()
        return {
            name: data.vod_name,
            author: data.vod_director,
            genre: data.vod_class.split(","),
            imageUrl: data.vod_pic,
            description: description,
            episodes: episodes
        };
    }
    async getVideoList(url) {
        return [{
            url: url,
            originalUrl: url,
            quality: "HLS"
        }];
    }
    getFilterList() {
        const source_categories = this.source_categories[this.getKey()];
        const categories = [{ type_name: "SelectOption", value: "", name: "全部" }];
        for (let category of source_categories) {
            categories.push({
                type_name: "SelectOption",
                value: category.value,
                name: category.name
            });
        }
        return [{
            type: "categories",
            name: "分类",
            type_name: "SelectFilter",
            values: categories
        }];
    }
    getSourcePreferences() {
        return [
            {
                "key": "domain_url",
                "editTextPreference": {
                  "title": "Url",
                  "summary": "网址",
                  "value": "",
                  "dialogTitle": "URL",
                  "dialogMessage": "",
                }
            }
        ];
    }
}
