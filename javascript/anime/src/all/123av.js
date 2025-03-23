const mangayomiSources = [{
    "name": "123AV",
    "langs": ["en", "ja", "ko", "zh", "ms", "th", "de", "fr", "vi", "id", "fil", "hi"],
    "ids": {
        "en": 149777474,
        "ja": 262221765,
        "ko": 146621160,
        "zh": 49635576,
        "ms": 246893722,
        "th": 68236809,
        "de": 2304207,
        "fr": 282370285,
        "vi": 177649958,
        "id": 236459402,
        "fil": 426585818,
        "hi": 97772948
    },
    "baseUrl": "https://123av.com",
    "apiUrl": "",
    "iconUrl": "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-ex/main/javascript/icon/all.123av.png",
    "typeSource": "single",
    "itemType": 1,
    "isNsfw": true,
    "version": "0.0.1",
    "apiUrl": "",
    "dateFormat": "",
    "dateFormatLocale": "",
    "hasCloudflare": true,
    "pkgName": "anime/src/all/123av.js"
}];

class DefaultExtension extends MProvider {
    async request(url) {
        const res = await new Client().get(this.source.baseUrl + "/" + this.source.lang + url);
        return res.body;
    }

    async getItems(url) {
        const res = await this.request(url);
        const doc=new Document(res);
        const text =doc.selectFirst("div#body").innerHtml;
        const regex = /<a href="([^"]+)" title="([^"]+)">[\s\S]*?<img class="lazyload" data-src="([^"]+)" title="[^"]+" alt="([^"]+)">/g;
        let match;
        const items = [];
        while ((match = regex.exec(text)) !== null) {
            items.push({
                name: match[2].trim(),
                imageUrl: match[3].trim(),
                link: "/" + match[1].trim()
            });
        }
        return {
            list: items,
            hasNextPage: true
        }
    }

    async getPopular(page) {
        return await this.getItems(`/dm3/trending?page=${page}`);
    }

    async getLatestUpdates(page) {
        return await this.getItems(`/dm2/new-release?page=${page}`);
    }

    async search(query, page, filters) {
        if (query == "") {
            var category, sort;
            for (const filter of filters) {
                if (filter["type"] == "CateFilter") {
                    category = filter["values"][filter["state"]]["value"];
                } else if (filter["type"] == "SortFilter") {
                    sort = filter["values"][filter["state"]]["value"];
                }
            }
            return await this.getItems(`${category}?sort=${sort}&page=${page}`);
        } else {
            return await this.getItems(`/search?keyword=${query}&page=${page}`);
        }
    }

    async getEpisodes(id, time) {
        const res = await this.request(`/ajax/v/${id}/videos`);
        const datas = JSON.parse(res);
        const ep = [];
        for (const data of datas["result"]["watch"]) {
            ep.push({
                name: data["name"],
                url: data["url"]
            });
        }
        ep.reverse();
        return ep;
    }

    async getDetail(url) {
        const res = await this.request(url);
        let match = res.match(/<h1>(.*?)<\/h1>/);
        const description = match ? match[1] : "";
        match = res.match(/v-scope="Movie\(\{id:\s*(\d+),/);
        const id = match[1];
        const eps = await this.getEpisodes(id);
        return {
            description: description,
            episodes: eps
        };
    }

    async getVideoList(url) {
        const res = await new Client().get(url);
        const doc = new Document(res.body);
        const str = doc.selectFirst("div#player").attr("v-scope").match(/, {([^']*)\)/)[1].replaceAll("&quot;", '"');
        const data = JSON.parse("{" + str);
        return [{
            url: data["stream"],
            originalUrl: data["stream"],
            quality: "Origin",
            headers: {
                Referer: "https://javplayer.me/",
                Origin: "https://javplayer.me"
            }
        }];
    }

    getFilterList() {
        return [{
            "type": "CateFilter",
            "type_name": "SelectFilter",
            "name": "Category",
            "values": [{
                "value": "/dm2/censored",
                "name": "Censored",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm3/uncensored",
                "name": "Uncensored",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/uncensored-leaked",
                "name": "Uncensored Leaked",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/vr",
                "name": "VR",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm3/tags/fc2",
                "name": "FC2",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm25/tags/heyzo",
                "name": "HEYZO",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/tokyo-hot",
                "name": "Tokyo-Hot",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm33/tags/1pondo",
                "name": "1pondo",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm34/tags/caribbeancom",
                "name": "Caribbeancom",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm12/tags/caribbeancompr",
                "name": "Caribbeancompr",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm35/tags/10musume",
                "name": "10musume",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm25/tags/pacopacomama",
                "name": "pacopacomama",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/gachig",
                "name": "Gachinco",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/xxx-av",
                "name": "XXX-AV",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/c0930",
                "name": "C0930",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/h4610",
                "name": "H4610",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/h0930",
                "name": "H0930",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/siro",
                "name": "SIRO",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/259luxu",
                "name": "LUXU",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/200gana",
                "name": "200GANA",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/prestige-premium",
                "name": "PRESTIGE PREMIUM",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/s-cute",
                "name": "S-CUTE",
                "type_name": "SelectOption"
            },
            {
                "value": "/dm2/tags/261ara",
                "name": "ARA",
                "type_name": "SelectOption"
            }
            ]
        },
        {
            "type": "SortFilter",
            "type_name": "SelectFilter",
            "name": "Sort",
            "values": [{
                "value": "recent_update",
                "name": "Recent Update",
                "type_name": "SelectOption"
            },
            {
                "value": "release_date",
                "name": "Release date",
                "type_name": "SelectOption"
            },
            {
                "value": "trending",
                "name": "Trending",
                "type_name": "SelectOption"
            },
            {
                "value": "most_viewed_today",
                "name": "Most viewed today",
                "type_name": "SelectOption"
            },
            {
                "value": "most_viewed_week",
                "name": "Most viewed by week",
                "type_name": "SelectOption"
            },
            {
                "value": "most_viewed_month",
                "name": "Most viewed by month",
                "type_name": "SelectOption"
            },
            {
                "value": "most_viewed",
                "name": "Most viewed",
                "type_name": "SelectOption"
            }, {
                "value": "most_favourited",
                "name": "Most favourited",
                "type_name": "SelectOption"
            }
            ]
        }
        ];

    }

    getSourcePreferences() {
        
    }
}