# I18N JSON to Excel Exporter
Simple JS program that extracts I18N related data from JSON and exports as Excel, for Stick Warfare: Blood Strike, but you can use for your own purpose.

## What is this?
This program will convert this kind of JSON source:

```json
{
    "stringData": "Hello",
    "numberData": 29,
    "objectData": {
        "name": "Rico",
        "company": "Team Modernator"
    },
    "arrayData": [
        "First",
        "Second"
    ],
    "nested": {
        "data": "hey hey",
        "nested": {
            "hello": "world",
            "scripts": [
                "WOW",
                "SO SCARE",
                "CONCERN"
            ]
        }
    },
    "objectArray": [
        {
            "name": "James",
            "age": 28
        },
        {
            "name": "Rico",
            "age": 29
        }
    ]
}
```

Into this(Excel):

|||
|-----------------|---|
| stringData | Hello |
| numberData | 29 |
| objectData.name | Rico |
| objectData.company | Team Modernator |
| arrayData.0 | First |
| arrayData.1 | Second |
| nested.data | hey hey |
| nested.nested.hello | world |
| nested.nested.scripts.0 | WOW |
| nested.nested.scripts.1 | SO SCARE |
| nested.nested.scripts.2 | CONCERN |
| objectArray.0.name | James |
| objectArray.0.age | 28 |
| objectArray.1.name | Rico |
| objectArray.1.age | 29 |


## Getting Started
Program wrote by Node.js 14.12.0. If you have any problem with different version, please update your Node version atleast to 14.0.0. NVM is a great tool without override your current Node.js.

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
-o: Output directory. Default is 'result.xlsx'
```

## License
MIT. Do whatever you want. You can feel free to make PR if you want to improve or fixed a bug.