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
}];

class DefaultExtension extends MProvider {
    source_categories = {
        "thzy": [{"value":"27","name":"主播网红"},{"value":"25","name":"日本无码"},{"value":"26","name":"日本有码"},{"value":"28","name":"日本素人"},{"value":"9","name":"欧美"},{"value":"10","name":"禁漫"},{"value":"23","name":"乱伦"},{"value":"24","name":"探花"},{"value":"22","name":"学生"},{"value":"6","name":"国产精品"},{"value":"7","name":"华语AV"},{"value":"8","name":"黑料吃瓜"}],
        "bwzy": [{"value":"31","name":"视频一区"},{"value":"32","name":"国产视频"},{"value":"33","name":"国产主播"},{"value":"34","name":"91大神"},{"value":"35","name":"热门事件"},{"value":"36","name":"传媒自拍"},{"value":"37","name":"视频二区"},{"value":"38","name":"日本有码"},{"value":"39","name":"日本无码"},{"value":"40","name":"韩国主播"},{"value":"41","name":"动漫肉番"},{"value":"42","name":"女同性恋"}]
    };
    baseURL() {
        const preference = new SharedPreferences();
        const custom = preference.get("domain_url");
        if (custom.length == 0) {
            return this.source.baseUrl;
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
                link: data.vod_id,
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
