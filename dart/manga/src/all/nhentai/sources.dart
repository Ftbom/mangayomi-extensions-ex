import '../../../../../model/source.dart';

const _nhentaiVersion = "0.0.15";
const _nhentaiSourceCodeUrl =
    "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-ex/$branchName/dart/manga/src/all/nhentai/nhentai.dart";

String _iconUrl =
    "https://raw.githubusercontent.com/Ftbom/mangayomi-extensions-ex/$branchName/dart/manga/src/all/nhentai/icon.png";
const _baseUrl = 'https://nhentai.net';
const _isNsfw = true;
const _itemType = ItemType.manga;

List<String> _languages = ["all", "en", "zh", "ja"];

List<Source> get nhentaiSourcesList => _nhentaiSourcesList;
List<Source> _nhentaiSourcesList = _languages
    .map((e) => Source(
        name: 'NHentai',
        baseUrl: _baseUrl,
        hasCloudflare: true,
        lang: e,
        typeSource: "NHentai",
        iconUrl: _iconUrl,
        isNsfw: _isNsfw,
        itemType: _itemType,
        version: _nhentaiVersion,
        sourceCodeUrl: _nhentaiSourceCodeUrl))
    .toList();
