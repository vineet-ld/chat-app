var expect = require("expect");

var message = require("./message");

describe("generateMessage", () => {

    it("should generate correct message object", () => {

        var sender = "testuser";
        var msgText = "Some message";

        var msgObj = message.generate(sender, msgText);

        expect(typeof msgObj).toBe("object");
        expect(msgObj).toMatchObject({from: sender, text: msgText});
        expect(typeof msgObj.createdAt).toBe("number");

    });

});