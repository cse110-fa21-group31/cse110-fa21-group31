module.exports = {
    "presets": [
        "@babel/preset-env"
    ],
    "env": {
        "test": {
          "plugins": ["@babel/plugin-transform-modules-commonjs"]
        }
    },
    "moduleFileExtensions": ["js", "jsx", "ts", "tsx"],
    "moduleDirectories": ["source", "__tests__"],
    "transform": {
        "^.+\\.(js|jsx)$": "babel-jest",
    }
}