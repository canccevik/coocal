var Coocal = require("../index").default;
var Utils = require("../index");
var { expect, assert } = require("chai");
require("../createDOM");
require("mocha");

describe("Util Functions", () => {
    it("Should return expire date from seconds", () => {
        let result = Utils.createExpireDateWithSeconds(1).setMilliseconds(0);
        let expected = new Date(new Date().getTime() + 1000).setMilliseconds(0);
        
        expect(result).to.eql(expected);
    });

    it("Should return expire date from object", () => {
        let result = Utils.createExpireDateWithObject({ s: 1 }).setMilliseconds(0);
        let expected = new Date(new Date().getTime() + 1000).setMilliseconds(0);

        expect(result).to.eql(expected);
    });

    it("Should return expire date from string", () => {
        let result = Utils.createExpireDateWithString("1s").setMilliseconds(0);
        let expected = new Date(new Date().getTime() + 1000).setMilliseconds(0);
        
        expect(result).to.eql(expected);
    });

    it("Should return error from create expire date with string function", () => {
        expect(() => Utils.createExpireDateWithString("1S").setMilliseconds(0)).throw("Invalid date string.");
    });

    it("Should sync the localStorage", () => {
        Coocal.setLocalStorageItem("package_name", "coocal");
        Utils.syncLocalStorage();

        let result;
        Coocal.getAllLocalStorageItems().forEach(item => {
            if (new Date(item.expireDate).getTime() < new Date().getTime()) {
                result = false;
            }
        });
    
        assert.notEqual(result, false);
    });

    it("Should return true from is valid json function", () => {
        let json = '{"package_name": "coocal", "author": "canccevik"}';
        let result = Utils.isValidJSON(json);
        
        expect(result).to.eql(true);
    });

    it("Should return false from is valid json function", () => {
        let json = '{package_name: coocal, author: canccevik}';
        let result = Utils.isValidJSON(json);
        
        expect(result).to.eql(false);
    });
});
