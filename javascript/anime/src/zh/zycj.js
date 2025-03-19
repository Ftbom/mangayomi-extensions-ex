const mangayomiSources = [{
    "name": "资源采集",
    "lang": "zh",
    "baseUrl": "",
    "apiUrl": "",
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
    "name": "test",
    "lang": "zh",
    "baseUrl": "",
    "apiUrl": "",
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
    categories_type = [
        [{"value":"1","name":"电影"},{"value":"2","name":"连续剧"},{"value":"3","name":"综艺"},{"value":"4","name":"动漫"},{"value":"5","name":"伦理片"},{"value":"6","name":"动作片"},{"value":"7","name":"喜剧片"},{"value":"8","name":"爱情片"},{"value":"9","name":"科幻片"},{"value":"10","name":"恐怖片"},{"value":"11","name":"剧情片"},{"value":"12","name":"战争片"},{"value":"13","name":"国产剧"},{"value":"14","name":"香港剧"},{"value":"15","name":"韩国剧"},{"value":"16","name":"欧美剧"},{"value":"17","name":"体育"},{"value":"18","name":"NBA"},{"value":"20","name":"惊悚片"},{"value":"21","name":"家庭篇"},{"value":"22","name":"古装片"},{"value":"23","name":"历史片"},{"value":"24","name":"悬疑片"},{"value":"25","name":"犯罪片"},{"value":"26","name":"灾难片"},{"value":"27","name":"纪录片"},{"value":"28","name":"短片"},{"value":"29","name":"动画片"},{"value":"30","name":"台湾剧"},{"value":"31","name":"日本剧"},{"value":"32","name":"海外剧"},{"value":"33","name":"泰国剧"},{"value":"34","name":"大陆综艺"},{"value":"35","name":"港台综艺"},{"value":"36","name":"日韩综艺"},{"value":"37","name":"欧美综艺"},{"value":"38","name":"国产动漫"},{"value":"39","name":"欧美动漫"},{"value":"40","name":"日韩动漫"},{"value":"41","name":"足球"},{"value":"42","name":"篮球"},{"value":"43","name":"未分类"},{"value":"45","name":"西部片"},{"value":"46","name":"爽文短剧"},{"value":"47","name":"现代都市"},{"value":"48","name":"脑洞悬疑"},{"value":"49","name":"年代穿越"},{"value":"50","name":"古装仙侠"},{"value":"51","name":"反转爽剧"},{"value":"52","name":"女频恋爱"},{"value":"53","name":"成长逆袭"}],
        [{"value":"20","name":"电影"},{"value":"22","name":"冒险片"},{"value":"24","name":"剧情片"},{"value":"26","name":"动作片"},{"value":"28","name":"动画电影"},{"value":"30","name":"同性片"},{"value":"32","name":"喜剧片"},{"value":"34","name":"奇幻片"},{"value":"36","name":"恐怖片"},{"value":"38","name":"悬疑片"},{"value":"40","name":"惊悚片"},{"value":"42","name":"歌舞片"},{"value":"44","name":"灾难片"},{"value":"46","name":"爱情片"},{"value":"48","name":"科幻片"},{"value":"50","name":"犯罪片"},{"value":"52","name":"经典片"},{"value":"54","name":"网络电影"},{"value":"56","name":"战争片"},{"value":"58","name":"伦理片"},{"value":"60","name":"电视剧"},{"value":"62","name":"欧美剧"},{"value":"64","name":"日剧"},{"value":"66","name":"韩剧"},{"value":"68","name":"台剧"},{"value":"70","name":"泰剧"},{"value":"72","name":"国产剧"},{"value":"74","name":"港剧"},{"value":"76","name":"新马剧"},{"value":"78","name":"其他剧"},{"value":"80","name":"动漫"},{"value":"82","name":"综艺"},{"value":"84","name":"体育"},{"value":"86","name":"纪录片"},{"value":"88","name":"篮球"},{"value":"90","name":"足球"},{"value":"92","name":"网球"},{"value":"94","name":"斯诺克"},{"value":"96","name":"欧美动漫"},{"value":"98","name":"日韩动漫"},{"value":"100","name":"国产动漫"},{"value":"102","name":"新马泰动漫"},{"value":"104","name":"港台动漫"},{"value":"106","name":"其他动漫"},{"value":"108","name":"国产综艺"},{"value":"110","name":"日韩综艺"},{"value":"112","name":"欧美综艺"},{"value":"114","name":"新马泰综艺"},{"value":"116","name":"港台综艺"},{"value":"118","name":"其他综艺"},{"value":"120","name":"短剧"},{"value":"122","name":"预告片"}],
        [{"value":"1","name":"电影片"},{"value":"2","name":"连续剧"},{"value":"3","name":"综艺片"},{"value":"4","name":"动漫片"},{"value":"6","name":"动作片"},{"value":"7","name":"喜剧片"},{"value":"8","name":"爱情片"},{"value":"9","name":"科幻片"},{"value":"10","name":"恐怖片"},{"value":"11","name":"剧情片"},{"value":"12","name":"战争片"},{"value":"13","name":"国产剧"},{"value":"14","name":"香港剧"},{"value":"15","name":"韩国剧"},{"value":"16","name":"欧美剧"},{"value":"20","name":"记录片"},{"value":"21","name":"台湾剧"},{"value":"22","name":"日本剧"},{"value":"23","name":"海外剧"},{"value":"24","name":"泰国剧"},{"value":"25","name":"大陆综艺"},{"value":"26","name":"港台综艺"},{"value":"27","name":"日韩综艺"},{"value":"28","name":"欧美综艺"},{"value":"29","name":"国产动漫"},{"value":"30","name":"日韩动漫"},{"value":"31","name":"欧美动漫"},{"value":"32","name":"港台动漫"},{"value":"33","name":"海外动漫"},{"value":"34","name":"伦理片"},{"value":"36","name":"短剧"}],
        [{"value":"1","name":"电视剧"},{"value":"2","name":"电影"},{"value":"3","name":"欧美剧"},{"value":"4","name":"香港剧"},{"value":"5","name":"韩剧"},{"value":"6","name":"日剧"},{"value":"7","name":"马泰剧"},{"value":"8","name":"伦理片"},{"value":"9","name":"动作片"},{"value":"10","name":"爱情片"},{"value":"11","name":"喜剧片"},{"value":"12","name":"科幻片"},{"value":"13","name":"恐怖片"},{"value":"14","name":"剧情片"},{"value":"15","name":"战争片"},{"value":"16","name":"记录片"},{"value":"17","name":"动漫"},{"value":"20","name":"内地剧"},{"value":"23","name":"动画片"},{"value":"24","name":"中国动漫"},{"value":"25","name":"日本动漫"},{"value":"26","name":"欧美动漫"},{"value":"27","name":"综艺"},{"value":"28","name":"台湾剧"},{"value":"29","name":"体育赛事"},{"value":"30","name":"大陆综艺"},{"value":"31","name":"日韩综艺"},{"value":"32","name":"港台综艺"},{"value":"33","name":"欧美综艺"},{"value":"34","name":"灾难片"},{"value":"35","name":"悬疑片"},{"value":"36","name":"犯罪片"},{"value":"37","name":"奇幻片"},{"value":"38","name":"短剧"}],
        [{"value":"27","name":"主播网红"},{"value":"25","name":"日本无码"},{"value":"26","name":"日本有码"},{"value":"28","name":"日本素人"},{"value":"9","name":"欧美"},{"value":"10","name":"禁漫"},{"value":"23","name":"乱伦"},{"value":"24","name":"探花"},{"value":"22","name":"学生"},{"value":"6","name":"国产精品"},{"value":"7","name":"华语AV"},{"value":"8","name":"黑料吃瓜"}],
        [{"value":"31","name":"视频一区"},{"value":"32","name":"国产视频"},{"value":"33","name":"国产主播"},{"value":"34","name":"91大神"},{"value":"35","name":"热门事件"},{"value":"36","name":"传媒自拍"},{"value":"37","name":"视频二区"},{"value":"38","name":"日本有码"},{"value":"39","name":"日本无码"},{"value":"40","name":"韩国主播"},{"value":"41","name":"动漫肉番"},{"value":"42","name":"女同性恋"}]
    ];
    SourceMap = {
        zy360: { url: "http://360zy.com", name: "360资源", categories: 0},
        hwba: {url: "https://cjhwba.com", name: "华为吧资源", categories: 1},
        ffzy: {url: "http://ffzy.tv", name: "非凡资源", categories: 2},
        jisuzy: {url: "https://www.jisuzy.com", name: "极速资源", categories: 3},
        thzy: { url: "https://thzy1.me", name: "桃花资源(18+)", categories: 4},
        bwzy: {url: "https://api.bwzym3u8.com", name: "百万资源(18+)", categories: 5}
    };
    getKey() {
        const preference = new SharedPreferences();
        return preference.get("source");
    }
    async request(url, source) {
        const source_url = this.SourceMap[source].url;
        return await new Client().get(`${source_url}/api.php/provide/vod?ac=detail${url}`, { "Referer": source_url });
    }
    async parseData(url) {
        const source = this.getKey()
        const res = await this.request(url, source);
        const datas = JSON.parse(res.body);
        const results = [];
        for (let data of datas.list) {
            results.push({
                link: `${source}|${data.vod_id}`,
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
        let category = filters[0].values[filters[0].state].value;
        if (category != "") {
            category = "&t=" + category;
        }
        return await this.parseData(`&wd=${query}${category}&pg=${page}`);
    }
    async getDetail(url) {
        const [source, _url] = url.split("|");
        const res = await this.request("&ids=" + _url, source);
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
        const source_categories = this.categories_type[this.SourceMap[this.getKey()].categories];
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
        const names = [];
        const keys = [];
        for (let key of Object.keys(this.SourceMap)) {
            keys.push(key);
            names.push(this.SourceMap[key].name);
        }
        return [
            {
                "key": "source",
                "listPreference": {
                    "title": "源",
                    "summary": "",
                    "valueIndex": 0,
                    "entries": names,
                    "entryValues": keys,
                }
            }
        ];
    }
}