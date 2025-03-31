const mangayomiSources = [{
    "name": "JavGuru",
    "lang": "all",
    "baseUrl": "https://jav.guru",
    "apiUrl": "",
    "iconUrl": "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-ex/main/javascript/icon/all.javguru.png",
    "typeSource": "single",
    "itemType": 1,
    "isNsfw": true,
    "version": "0.0.1",
    "apiUrl": "",
    "dateFormat": "",
    "dateFormatLocale": "",
    "hasCloudflare": true,
    "pkgName": "anime/src/all/javguru.js"
}];

class DefaultExtension extends MProvider {
    base64decode(str) {
        const base64DecodeChars = new Array(
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
            52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 64, -1, -1,
            -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
            -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
        );
        let c1, c2, c3, c4;
        let i = 0, len = str.length, out = "";
        while (i < len) {
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 === -1);
            if (c1 === -1) break;
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 === -1);
            if (c2 === -1) break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 === 61) return out;
                c3 = base64DecodeChars[c3];
            } while (i < len && c3 === -1);
            if (c3 === -1) break;
            out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 === 61) return out;
                c4 = base64DecodeChars[c4];
            } while (i < len && c4 === -1);
            if (c4 === -1) break;

            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    }

    UrlBasePath(playlistUrl) {
        // 提取协议和剩余部分
        const protocolIndex = playlistUrl.indexOf('://');
        const protocol = playlistUrl.substring(0, protocolIndex);
        const rest = playlistUrl.substring(protocolIndex + 3); // 跳过 '://'
        let hostAndPort, path;
        const firstSlashIndex = rest.indexOf('/');
        // 分离主机（含端口）和路径
        if (firstSlashIndex === -1) {
            hostAndPort = rest;
            path = '/';
        } else {
            hostAndPort = rest.substring(0, firstSlashIndex);
            path = rest.substring(firstSlashIndex);
        }
        // 移除主机中的用户信息（如 user:pass@）
        const atIndex = hostAndPort.indexOf('@');
        const hostPortPart = atIndex !== -1
            ? hostAndPort.substring(atIndex + 1)
            : hostAndPort;
        // 处理路径，截取到最后一个斜杠并保留结尾斜杠
        const lastSlashIndex = path.lastIndexOf('/');
        const directoryPath = lastSlashIndex !== -1
            ? path.substring(0, lastSlashIndex + 1)
            : '/';
        // 组合成最终结果
        return `${protocol}://${hostPortPart}${directoryPath}`;
    }

    resolveUrl(url, baseUrl) {
        // 若 url 是绝对 URL，直接返回
        if (/^[a-zA-Z]+:\/\//.test(url)) return url;
        // 解析 baseUrl 的协议、主机、路径
        const [baseProtocol, baseHost, basePath] = this.parseBaseUrl(baseUrl);
        // 处理协议相对 URL (以 // 开头)
        if (url.startsWith('//')) {
            return `${baseProtocol}//${url.substring(2)}`;
        }
        // 处理根路径相对 URL (以 / 开头)
        if (url.startsWith('/')) {
            return `${baseProtocol}//${baseHost}${url}`;
        }
        // 合并路径并处理 . 和 ..
        const mergedPath = this.mergePaths(basePath, url);
        // 组合最终 URL
        return `${baseProtocol}//${baseHost}${mergedPath}`;
    }

    // 解析 baseUrl 的协议、主机、路径
    parseBaseUrl(baseUrl) {
        const protocolEnd = baseUrl.indexOf('://');
        const protocol = baseUrl.substring(0, protocolEnd + 3);
        const rest = baseUrl.substring(protocolEnd + 3);
        const hostEnd = rest.indexOf('/');
        const host = hostEnd === -1 ? rest : rest.substring(0, hostEnd);
        const path = hostEnd === -1 ? '/' : rest.substring(hostEnd);
        return [protocol, host, path];
    }
    // 合并路径并处理 . 和 ..
    mergePaths(basePath, relativePath) {
        // 分割路径为数组
        const baseParts = basePath.split('/').filter(p => p !== '');
        const relativeParts = relativePath.split('/');
        // 移除 basePath 最后的文件名（如果有）
        if (!basePath.endsWith('/') && baseParts.length > 0) {
            baseParts.pop();
        }
        // 合并路径部分
        for (const part of relativeParts) {
            if (part === '.') continue;
            if (part === '..') {
                if (baseParts.length > 0) baseParts.pop();
            } else {
                baseParts.push(part);
            }
        }
        // 确保以 / 开头
        return '/' + baseParts.join('/');
    }

    getAbsoluteUrl(url, playlistUrl, masterBase) {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        if (url.startsWith('//')) return `https:${url}`;
        if (url.startsWith('/')) return this.resolveUrl(url, playlistUrl);
        return `${masterBase}${url}`;
    }

    async extractFromHls(playlistUrl, masterHeaders = {}, videoHeaders = {}, subtitleList = [], audioList = []) {
        // Fetch master playlist
        const masterPlaylistResponse = await new Client().get(playlistUrl, masterHeaders);
        const masterPlaylist = masterPlaylistResponse.body;
        // Check if there isn't multiple streams available
        if (!masterPlaylist.includes('#EXT-X-STREAM-INF:')) {
            return [{
                url: playlistUrl,
                originalUrl: playlistUrl,
                quality: "Origin",
                headers: masterHeaders,
                subtitles: subtitleList,
                audios: audioList,
            }];
        }
        const masterUrlBasePath = this.UrlBasePath(playlistUrl);
        // Get subtitles
        const subtitleTracks = subtitleList.concat([...masterPlaylist.matchAll(/#EXT-X-MEDIA:TYPE=SUBTITLES.*?NAME="(.*?)".*?URI="(.*?)"/g)].map(match => ({
            file: this.getAbsoluteUrl(match[2], playlistUrl, masterUrlBasePath),
            label: match[1]
        })).filter(track => track.url));
        // Get audio tracks
        const audioTracks = audioList.concat([...masterPlaylist.matchAll(/#EXT-X-MEDIA:TYPE=AUDIO.*?NAME="(.*?)".*?URI="(.*?)"/g)].map(match => ({
            file: this.getAbsoluteUrl(match[2], playlistUrl, masterUrlBasePath),
            label: match[1]
        })).filter(track => track.url));
        return masterPlaylist.split('#EXT-X-STREAM-INF:').slice(1).map(part => {
            const codec = part.match(/CODECS="([^"]+)"/)?.[1];
            if (codec && codec.startsWith('mp4a')) return null;
            const resolution = part.match(/RESOLUTION=\d+x(\d+)/)?.[1];
            const videoUrl = this.getAbsoluteUrl(part.split('\n')[1], playlistUrl, masterUrlBasePath);
            return videoUrl ? {
                url: videoUrl,
                originalUrl: videoUrl,
                quality: `${resolution}p`,
                headers: videoHeaders,
                subtitles: subtitleTracks,
                audios: audioTracks,
            } : null;
        }).filter(video => video);
    }

    async request(url) {
        const res = await new Client().get(this.source.baseUrl + url);
        return res.body;
    }

    async getItems(url) {
        const res = await this.request(url);
        const doc = new Document(res);
        const elements = doc.select("div.imgg");
        const items = [];
        for (let element of elements) {
            const img = element.selectFirst("img");
            items.push({
                name: img.attr("alt"),
                imageUrl: img.attr("src"),
                link: element.selectFirst("a").attr("href")
            });
        }
        return {
            list: items,
            hasNextPage: true
        }
    }

    async getPopular(page) {
        const res = await this.request("/most-watched-rank/");
        const doc = new Document(res);
        const elements = doc.select("ul.wpp-list li");
        const items = [];
        for (let element of elements) {
            const info = element.selectFirst("a");
            items.push({
                name: info.text,
                imageUrl: element.selectFirst("img").attr("src"),
                link: info.attr("href")
            });
        }
        return {
            list: items,
            hasNextPage: false
        }
    }

    async getLatestUpdates(page) {
        return await this.getItems(`/page/${page}/`);
    }

    async search(query, page, filters) {
        var category = "";
        var sort = "";
        for (const filter of filters) {
            if (filter["type"] == "CateFilter") {
                category = filter["values"][filter["state"]]["value"];
            } else if (filter["type"] == "SortFilter") {
                sort = filter["values"][filter["state"]]["value"];
            }
        }
        if (query == "") {
            if (category.length > 0) {
                category = `/category/${category}`
            }
            if (sort.length > 0) {
                sort = `orderby=${sort}&`;
            }
            return await this.getItems(`${category}/page/${page}/?${sort}order=DESC`);
        } else {
            if (category.length > 0) {
                category = `&category_name=${category}`
            }
            if (sort.length > 0) {
                sort = `&orderby=${sort}`;
            }
            return await this.getItems(`/page/${page}/?s=${query}${category}${sort}&order=DESC`);
        }
    }

    async getEpisodes(doc, url) {
        const source_keys = {};
        const elements = doc.select("ul.smenu li a#wp-btn-iframe");
        for (let element of elements) {
            const name = element.text;
            source_keys[name] = element.attr("data-localize");
        }
        const regex = /<script[^>]*\bid=["']wp-btn-iframe-js-extra["'][^>]*>([\s\S]*?)<\/script>/i;
        const script = regex.exec(doc.outerHtml)[1];
        const ep = [];
        const Servers = { "STREAM TV": "Emturbovid", "STREAM ST": "Streamtape", "STREAM SB": "Javclan", "STREAM DD": "Doodjav", "STREAM LU": "Streamhihi", "STREAM JK": "Maxstream" };
        for (let name of Object.keys(source_keys)) {
            const start = script.search(`var ${source_keys[name]} = `) + 7 + source_keys[name].length;
            const end = start + script.substring(start, script.length).search("};") + 1;
            if ((name == "STREAM LU") || (name == "STREAM JK")) {
                continue;
            }
            ep.push({
                name: Servers[name],
                url: Servers[name] + "||" + url + "||" + this.base64decode(JSON.parse(script.substring(start, end)).iframe_url)
            });
        }
        return ep;
    }

    async getDetail(url) {
        const res = await new Client().get(url);
        const doc = new Document(res.body);
        const title = doc.selectFirst("h1.titl").text;
        const cover = doc.selectFirst("div.large-screenimg img").attr("src");
        const description = doc.selectFirst("div.wp-content").text;
        return {
            name: title,
            imageUrl: cover,
            description: description,
            episodes: await this.getEpisodes(doc, url)
        };
    }

    async streamtapeExtractor(url) {
        const res = await new Client().get(url);
        let text = res.body;
        const doc = new Document(text);
        const base_url = "https://" + doc.selectFirst("#botlink").text.split("/")[1];
        let s = text.search(/getElementById\('botlink'\)/) + 35;
        text = text.substr(s);
        s = text.search(/\?id=/);
        let e = text.search(/'\)/);
        const v_url = base_url + "/get_video" + text.substring(s, e);
        return [{
            url: v_url,
            originalUrl: v_url,
            quality: "origin"
        }];
    }

    async doodjavExtractor(url) {
        const res = await new Client().get(url);
        const text = res.body;
        const match = text.match(/\/pass_md5\/[^']*/);
        const md5 = await new Client().get("https://all3do.com" + match[0]);
        const v_url = md5.body + "zUEJeL3mUN?token=" + match[0].split("/").slice(-1)[0];
        const headers = { Referer: "https://all3do.com/" };
        return [{
            url: v_url,
            originalUrl: v_url,
            quality: "origin",
            headers: headers
        }];
    }

    //javclan,streamhihi
    async javExtractor(url, baseurl) {
        const res = await new Client().get(url, { Referer: baseurl + "/" });
        let text = res.body;
        if (text.search(/jwplayer\("vplayer"\)/) == -1) {
            const start = text.search(/eval\(function\(p,a,c,k,e,d\)/);
            const end = text.search(/'.split\('|'\)\)\)\n<\/script>/) + 14;
            text = unpackJs(text.substring(start, end));
        }
        let url_s = text.search(/sources:\[\{file:"/) + 16;
        if (url_s == 15) {
            url_s = text.search(/sources: \[\{file:"/) + 17;
        }
        const url_e = text.substr(url_s).search(/"\}\]/) + url_s;
        const v_url = text.substring(url_s, url_e);
        const headers = { "Referer": baseurl + "/",
            "Origin": baseurl, "Accept": "*/*",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site"};
        return await this.extractFromHls(v_url, headers, headers);
    }

    async maxstreamExtractor(url) {
        const res = await new Client().get(url);
        const text = res.body;
        const start = text.search(/eval\(function\(p,a,c,k,e,d\)/);
        const end = text.search(/'.split\('|'\)\)\)\n<\/script>/) + 14;
        const result = unpackJs(text.substring(start, end));
        const url_s = result.search(`",file:"`) + 8;
        const url_e = result.search(`",title:"`);
        const v_url = result.substring(url_s, url_e);
        const headers = { "Referer": "https://maxstream.org/",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site"};
        return await this.extractFromHls(v_url, headers, headers);
    }

    async emturbovidExtractor(url) {
        const res = await new Client().get(url, { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0" });
        const text = res.body;
        const start = text.search("var urlPlay = '") + 15;
        const end = text.substring(start, text.length).search("';") + start;
        const v_url = text.substring(start, end);
        const headers = { Referer: "https://emturbovid.com/" };
        return await this.extractFromHls(v_url, headers, headers);
    }

    async getVideoList(url) {
        const [server, referer, iurl] = url.split("||");
        const headers = { Referer: referer, "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0" }
        const res = await new Client().get(iurl, headers);
        const start = res.body.search(`<iframe frameborder="0" src="`) + 29;
        const end = res.body.search(/'\+OLID\+/);
        const parameter = url.match(/[?&]([^=]+)=([^&]+)/)[2];
        url = res.body.substring(start, end) + parameter.split('').reverse().join('');
        switch (server) {
            case "Emturbovid":
                return await this.emturbovidExtractor(url);
            case "Maxstream":
                return await this.maxstreamExtractor(url);
            case "Streamhihi":
                return await this.javExtractor(url, "https://streamhihi.com");
            case "Doodjav":
                return await this.doodjavExtractor(url);
            case "Javclan":
                return await this.javExtractor(url, "https://javclan.com");
            case "Streamtape":
                return await this.streamtapeExtractor(url);
        }
    }

    getFilterList() {
        return [{
            "type": "CateFilter",
            "type_name": "SelectFilter",
            "name": "Category",
            "values": [{
                "value": "",
                "name": "All",
                "type_name": "SelectOption"
            },
            {
                "value": "jav",
                "name": "JAV",
                "type_name": "SelectOption"
            },
            {
                "value": "amateur",
                "name": "Amateur",
                "type_name": "SelectOption"
            },
            {
                "value": "fc2",
                "name": "FC2",
                "type_name": "SelectOption"
            },
            {
                "value": "english-subbed",
                "name": "English subbed",
                "type_name": "SelectOption"
            },
            {
                "value": "jav-uncensored",
                "name": "Uncensored",
                "type_name": "SelectOption"
            },
            {
                "value": "decensored",
                "name": "Decensored",
                "type_name": "SelectOption"
            }
            ]
        },
        {
            "type": "SortFilter",
            "type_name": "SelectFilter",
            "name": "Sort",
            "values": [{
                "value": "date",
                "name": "Recent",
                "type_name": "SelectOption"
            },
            {
                "value": "likes-today",
                "name": "Trending",
                "type_name": "SelectOption"
            },
            {
                "value": "views-monthly",
                "name": "Views monthly",
                "type_name": "SelectOption"
            },
            {
                "value": "views",
                "name": "Views total",
                "type_name": "SelectOption"
            },
            {
                "value": "likes",
                "name": "Likes total",
                "type_name": "SelectOption"
            },
            {
                "value": "dislikes",
                "name": "Dislikes",
                "type_name": "SelectOption"
            },
            {
                "value": "comment_count",
                "name": "Comments",
                "type_name": "SelectOption"
            }, {
                "value": "rdate",
                "name": "Release date",
                "type_name": "SelectOption"
            }
            ]
        }
        ];
    }
}