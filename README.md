# HTTP Headers Customize

'HTTP Headers Customize' extension rewrite http headers based on a rules.

## Description

The extension rewrite the HTTP headers. add, modify and remove based on a rules.

Extension for 'Firefox Quantum'.

## Requirement

- 'Firefox Quantum' : 60+
- 'nodejs' : v8.11+ (Devlopment)

## Usage

### Rules

Set the rule for each line. The configurable parameters are as follows.

- Operations : add, modify or remove a header field.
- Header Name : header field name.
- Header Value : header field value.
- Comment : comment.
- Disabled : if checked it invalid.
- Actions :
  - remove : it row delete.

### Add rules

To create a new rule, please press the 'Add' button.

### Save and apply rules

To save and apply your changes, please press the 'Save' button.

## Devlopment

### Installation

```sh
npm install
```

### Build

```sh
npm run build
```

## Licence

This software is released under the MIT License, see LICENSE.txt.

## Author

[fumidzuki](https://fumidzuki.com)
