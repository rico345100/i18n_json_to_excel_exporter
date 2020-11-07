# I18N JSON to Excel Exporter
Simple JS program that extracts I18N related data from JSON and exports as Excel, for Stick Warfare: Blood Strike, but you can use for your own purpose.

## What is this?
This program will convert this kind of JSON source:

```json
{
    "topBar": {
        "cash": "Cash: <Color=#1ed300>{0} $</Color>",
        "gold": "Gold: <Color=#ffc000>{0} G</Color>",
        "packages": "Packages",
        "items": "Items"
    }
}
```

Into this(Excel):

|||
|-----------------|---|
| topBar.cash     | Cash: <Color=#1ed300>{0} $</Color>  |
| topBar.gold     | Gold: <Color=#ffc000>{0} G</Color>  |
| topBar.packages | Packages                            |
| topBar.items    | Items                               |


## Getting Started
Program wrote by Node.js 13.0.0. If you have any problem with different version, please set your Node version to 13.0.0. NVM is a great tool without override your current Node.js.

1. Get Node.js

2. Install Deps
```
$ npm install
```

3. Prepare your JSON and Run
```
$ node convert -i source.json
```

## Available Parameters

```
-i: Specify input directory. Must be specified.
-k: Key Connector. Default is dot(.).
-u: Uglify output JSON.
```

## License
MIT. Do whatever you want. You can feel free to make PR if you want to improve or fixed a bug.