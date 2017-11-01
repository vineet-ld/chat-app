var expect = require("expect");

var message = require("./message");

describe("message.js", () => {

    describe("generate()", () => {

        it("should generate correct message object", () => {

            var sender = "testuser";
            var msgText = "Some message";

            var msgObj = message.generate(sender, msgText);

            expect(typeof msgObj).toBe("object");
            expect(msgObj).toMatchObject({from: sender, text: msgText});
            expect(typeof msgObj.createdAt).toBe("number");

        });

    });

    describe("generateLocationMessage()", () => {

        it("should generate correct location message object", () => {
            var latitude = 1;
            var longitude = 1;
            var from = "testuser";

            var obj = message.generateLocationMessage(from, latitude, longitude);

            expect(typeof obj).toBe("object");
            expect(obj).toMatchObject({from, url: `https://www.google.com/maps?q=${latitude},${longitude}`});
            expect(typeof obj.createdAt).toBe("number");

        });

    });

});
