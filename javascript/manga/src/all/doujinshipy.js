const mangayomiSources = [{
    "name": "DoujinshiPy",
    "lang": "all",
    "baseUrl": "http://127.0.0.1:9000",
    "apiUrl": "",
    "iconUrl": "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-ex/main/javascript/icon/all.doujinshipy.png",
    "typeSource": "single",
    "itemType": 0,
    "isNsfw": true,
    "version": "0.0.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "pkgPath": "manga/src/all/doujinshipy.js"
}];

class DefaultExtension extends MProvider {
    getHeaders(url) {
        const preference = new SharedPreferences();
        return {
            Authorization: "Bearer " + preference.get("token")
        };
    }

    stringUTF8(text) {
        var bytes = [];
        for (var i = 0; i < text.length; i++) {
            bytes.push(text.charCodeAt(i));
        }
        var charCodes = [];
        var i = 0;
        while (i < bytes.length) {
            var byte1 = bytes[i];
            var charCode;

            if (byte1 < 0x80) {
                charCode = byte1;
                i += 1;
            } else if (byte1 < 0xE0) {
                var byte2 = bytes[i + 1];
                charCode = ((byte1 & 0x1F) << 6) | (byte2 & 0x3F);
                i += 2;
            } else if (byte1 < 0xF0) {
                var byte2 = bytes[i + 1];
                var byte3 = bytes[i + 2];
                charCode = ((byte1 & 0x0F) << 12) | ((byte2 & 0x3F) << 6) | (byte3 & 0x3F);
                i += 3;
            } else {
                var byte2 = bytes[i + 1];
                var byte3 = bytes[i + 2];
                var byte4 = bytes[i + 3];
                charCode = ((byte1 & 0x07) << 18) | ((byte2 & 0x3F) << 12) | ((byte3 & 0x3F) << 6) | (byte4 & 0x3F);
                i += 4;
            }

            charCodes.push(charCode);
        }
        return String.fromCharCode.apply(null, charCodes);
    }

    getBaseUrl() {
        const preference = new SharedPreferences();
        var base_url = preference.get("domain_url");
        if (base_url.endsWith("/")) {
            return base_url.slice(0, -1);
        }
        return base_url;
    }

    async getManga(url) {
        const base_url = this.getBaseUrl();
        const res = await new Client().get(base_url + url, this.getHeaders(""));
        const datas = JSON.parse(res.body);
        const mangas = [];
        for (const data of datas["data"]) {
            mangas.push({
                name: this.stringUTF8(data["title"]),
                imageUrl: base_url + data["cover"],
                link: data["id"]
            });
        }
        return {
            list: mangas,
            hasNextPage: true
        };

    }

    async getPopular(page) {
        return await this.getManga("/doujinshi/random?num=5");
    }

    async getLatestUpdates(page) {
        return await this.getManga(`/doujinshi?page=${page}`);
    }

    async search(query, page, filters) {
        let sort = 1;
        for (const filter of filters) {
            if (filter["type"] == "SortType") {
                sort = filter["values"][filter["state"]]["value"];
            }
        }
        sort = parseInt(sort);
        return await this.getManga(`/search?query=${query}&page=${sort * page}`);
    }

    async getDetail(url) {
        const base_url = this.getBaseUrl();
        const link = `/doujinshi/${url}/metadata`;
        const res = await new Client().get(base_url + link, this.getHeaders(""));
        const data = JSON.parse(res.body)["data"];
        const title = this.stringUTF8(data["title"]);
        const tags = [];
        var tags_;
        if ("translated_tags" in data) {
            tags_ = data["translated_tags"];
        } else {
            tags_ = data["tags"];
        }
        for (let tag of tags_) {
            tags.push(this.stringUTF8(tag).split(":")[1]);
        }
        return {
            name: title,
            imageUrl: base_url + data["cover"],
            genre: tags,
            episodes: [{
                name: title,
                url: data["id"]
            }],
            link: link
        };
    }

    async getPageList(url) {
        const base_url = this.getBaseUrl();
        const link = `/doujinshi/${url}/pages`;
        const res = await new Client().get(base_url + link, this.getHeaders(""));
        const data = JSON.parse(res.body)["data"];
        const results = [];
        let len = 0;
        if ("headers" in data) {

            len = data["urls"].length;
        } else {
            len = data.length;
        }
        for (let i = 0; i < len; i++) {
            results.push(base_url + `/doujinshi/${url}/page/${i}`);
        }
        return results;
    }

    getFilterList() {
        return [{
            type: "SortType",
            name: "排序",
            type_name: "SelectFilter",
            values: [{
                    type_name: "SelectOption",
                    name: "正序",
                    value: "1"
                },
                {
                    type_name: "SelectOption",
                    name: "倒序",
                    value: "-1"
                }
            ]
        }];
    }

    getSourcePreferences() {
        return [{
                "key": "domain_url",
                "editTextPreference": {
                    "title": "Server Url",
                    "summary": "the url of DoujinshiPy server",
                    "value": "http://127.0.0.1:9000",
                    "dialogTitle": "URL",
                    "dialogMessage": "",
                }
            },
            {
                "key": "token",
                "editTextPreference": {
                    "title": "Bearer Token ",
                    "summary": "the token of DoujinshiPy server",
                    "value": "demo",
                    "dialogTitle": "TOKEN",
                    "dialogMessage": "",
                }
            }
        ];
    }
}