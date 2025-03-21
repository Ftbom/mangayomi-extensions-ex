const mangayomiSources = [{
    "name": "NoyAcg",
    "lang": "zh",
    "baseUrl": "https://noy1.top",
    "apiUrl": "",
    "iconUrl": "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-zh/main/javascript/icon/zh.noyacg.jpg",
    "typeSource": "single",
    "itemType": 0,
    "isNsfw": true,
    "version": "0.0.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "pkgPath": "manga/src/zh/noyacg.js"
}];

class DefaultExtension extends MProvider {
    imageHOST() {
        const preference = new SharedPreferences();
        return "https://" + preference.get("imghost");
    }

    getHeaders(url) {
        return {
            Referer: this.source.baseUrl
        };
    }

    async getMangas(text, page, search) {
        let prefix = "info";
        if (search) {
            prefix = "Info";
        }
        const datas = JSON.parse(text);
        if (datas.status == "login") {
            return { list: [{ name: "请在WebView中登陆", imageUrl: "https://noy.asia/images/noriya/VACUUM-5.webp", link: "" }], hasNextPage: false };
        }
        const len = datas.len;
        const manga = [];
        for (let data of datas[prefix]) {
            manga.push({
                name: data.Bookname,
                imageUrl: this.imageHOST() + `/${data.Bid}/m1.webp`,
                link: data.Bid.toString()
            });
        }
        return {
            list: manga,
            hasNextPage: (len > 20 * page)
        };
    }

    async getPopular(page) {
        const res = await new Client().post(this.source.baseUrl + "/api/readLeaderboard",
            { Referer: this.source.baseUrl },
            { page: page.toString(), type: "day" });
        return this.getMangas(res.body, page);
    }

    async getLatestUpdates(page) {
        const res = await new Client().post(this.source.baseUrl + "/api/booklist_v2",
            { Referer: this.source.baseUrl },
            { page: page.toString() });
        return this.getMangas(res.body, page);

    }

    async search(query, page, filters) {
        let url = null;
        let body = null;
        if (query.length == 0) {
            if (filters.length == 0) {
                return {
                    list: [],
                    hasNextPage: false
                };
            }
            if (filters[2].state == 0) {
                const rankfilter = filters[3].state[0];
                const sortfilter = filters[3].state[1];
                url = "/api/" + rankfilter.values[rankfilter.state].value;
                body = {
                    page: page.toString(),
                    type: sortfilter.values[sortfilter.state].value
                };
            } else {
                if (filters[4].state == 1) {
                    url = "/api/randomBook";
                    const res = await new Client().post(this.source.baseUrl + url,
                        { Referer: this.source.baseUrl });
                    const datas = JSON.parse(res.body);
                    const manga = [];
                    for (let data of datas) {
                        manga.push({
                            name: data.Bookname,
                            imageUrl: this.imageHOST() + `/${data.Bid}/m1.webp`,
                            link: data.Bid.toString()
                        });
                    }
                    return {
                        list: manga,
                        hasNextPage: false
                    };
                } else if (filters[4].state == 2) {
                    url = "/api/favoriteslist_v2";
                    body = {
                        page: page.toString()
                    };
                } else {
                    url = "/api/proportion";
                    body = {
                        page: page.toString()
                    };
                } 
            }
        } else {
            let body = null;
            if (filters.length > 0) {
                const rangefilter = filters[0].state[0];
                const sortfilter = filters[0].state[1];
                body = {
                    info: query,
                    type: rangefilter.values[rangefilter.state].value,
                    sort: sortfilter.values[sortfilter.state].value,
                    page: page.toString()
                };
            }
            else {
                body = {
                    info: query,
                    type: "de",
                    sort: "bid",
                    page: page.toString()
                };
            }
            url = "/api/search_v2";
        }
        const res = await new Client().post(this.source.baseUrl + url,
            { Referer: this.source.baseUrl }, body);
        return this.getMangas(res.body, page, url.startsWith("/api/search"));
    }

    async getDetail(url) {
        const res = await new Client().post(this.source.baseUrl + "/api/getbookinfo",
            { Referer: this.source.baseUrl },
            { bid: url });
        const data = JSON.parse(res.body);
        const tags = [];
        tags.push(...data.Pname.split(" "));
        tags.push(...data.Ptag.split(" "));
        tags.push(...data.Otag.split(" "));
        return {
            name: data.Bookname,
            imageUrl: this.imageHOST() + `/${url}/1.webp`,
            author: data.Author,
            status: 1,
            genre: tags,
            link: `/#/book/${url}`,
            episodes: [{
                name: data.Bookname,
                url: url,
                dateUpload: data.Time.toString()
            }]
        }
    }

    async getPageList(url) {
        const res = await new Client().post(this.source.baseUrl + "/api/getbooklen",
            { Referer: this.source.baseUrl },
            { bid: url });
        const data = JSON.parse(res.body);
        const len = data.len;
        const imghost = this.imageHOST();
        const imglist = [];
        for (let i = 0; i < len; i++) {
            imglist.push(imghost + `/${url}/${i + 1}.webp`);
        } return imglist;
    }

    getFilterList() {
        return [
            {
                "type": "SearchFilter",
                "name": "搜索选项",
                "type_name": "GroupFilter",
                "state": [
                    {
                        "type": "RangeFilter",
                        "type_name": "SelectFilter",
                        "name": "范围",
                        "values": [{
                            "value": "de",
                            "name": "综合",
                            "type_name": "SelectOption"
                        },
                        {
                            "value": "tag",
                            "name": "标签",
                            "type_name": "SelectOption"
                        },
                        {
                            "value": "author",
                            "name": "作者",
                            "type_name": "SelectOption"
                        }
                        ]
                    },
                    {
                        "type": "SortFilter",
                        "type_name": "SelectFilter",
                        "name": "排序",
                        "values": [{
                            "value": "bid",
                            "name": "时间",
                            "type_name": "SelectOption"
                        },
                        {
                            "value": "views",
                            "name": "阅读",
                            "type_name": "SelectOption"
                        },
                        {
                            "value": "favorites",
                            "name": "收藏",
                            "type_name": "SelectOption"
                        }
                        ]
                    }]
            },
            {
                "type": "SeparatorFilter",
                "type_name": "SeparatorFilter"
            },
            {
                "type": "FilterFilter",
                "type_name": "SelectFilter",
                "name": "筛选选项",
                "values": [{
                    "value": "rank",
                    "name": "排行榜",
                    "type_name": "SelectOption"
                },
                {
                    "value": "other",
                    "name": "其他",
                    "type_name": "SelectOption"
                }
                ]
            },
            {
                "type": "RankFilter",
                "name": "排行榜",
                "type_name": "GroupFilter",
                "state": [
                    {
                        "type": "BoardFilter",
                        "type_name": "SelectFilter",
                        "name": "排行榜",
                        "values": [{
                            "value": "readLeaderboard",
                            "name": "阅读榜",
                            "type_name": "SelectOption"
                        },
                        {
                            "value": "favLeaderboard",
                            "name": "收藏榜",
                            "type_name": "SelectOption"
                        }
                        ]
                    },
                    {
                        "type": "RangeFilter",
                        "type_name": "SelectFilter",
                        "name": "范围",
                        "values": [{
                            "value": "day",
                            "name": "日",
                            "type_name": "SelectOption"
                        },
                        {
                            "value": "week",
                            "name": "周",
                            "type_name": "SelectOption"
                        },
                        {
                            "value": "moon",
                            "name": "月",
                            "type_name": "SelectOption"
                        }
                        ]
                    }]
            },
            {
                "type": "OtherFilter",
                "type_name": "SelectFilter",
                "name": "其他",
                "values": [{
                    "value": "proportion",
                    "name": "高质量榜",
                    "type_name": "SelectOption"
                },
                {
                    "value": "random",
                    "name": "随机",
                    "type_name": "SelectOption"
                },
                {
                    "value": "favorite",
                    "name": "收藏",
                    "type_name": "SelectOption"
                }
                ]
            }
        ];
    }

    getSourcePreferences() {
        return [{
            "key": "imghost",
            "listPreference": {
                "title": "图片分流",
                "summary": "",
                "valueIndex": 0,
                "entries": ["分流1", "分流2", "分流3"],
                "entryValues": ["img.noy.asia", "img.noyteam.online", "img.457475.xyz"],
            }
        }];
    }
}
