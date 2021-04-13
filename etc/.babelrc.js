module.exports = {
    presets: [
        ["@babel/preset-env", { loose: true }],
        ["@babel/preset-react"]
    ],
    plugins: [
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-throw-expressions"
    ]
}