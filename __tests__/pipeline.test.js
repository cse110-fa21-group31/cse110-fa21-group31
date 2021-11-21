const getHelloWorld = require("../source/scripts/example.js");

test('getHelloWorld should return "Hello World!"', () => {
    expect(getHelloWorld()).toBe("Hello World!");
});
