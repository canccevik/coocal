const Coocal = require("../index").default;
const { expect } = require("chai");
require("../createDOM");
require("mocha");

const removeExpireDateFieldsOfLsItems = (items) => {
    return items.map(item => {
        delete item["expireDate"];
        return item;
    });
}

describe("Coocal Class", () => {
    it("Should create a new cookie", () => {
        Coocal.setCookie("package_name", "coocal");

        let result = Coocal.getCookie("package_name");

        expect(result).to.eql("coocal");
    });

    it("Should return cookie's value", () => {
        Coocal.setCookie("package_name", "coocal");

        let result = Coocal.getCookie("package_name");

        expect(result).to.eql("coocal");
    });

    it("Should return undefined from the cookie's value", () => {
        let result = Coocal.getCookie("nonexistent_cookie");
        expect(result).to.eql(undefined);
    });

    it("Should return all cookies", () => {
        Coocal.setCookie("package_name", "coocal");
        Coocal.setCookie("author", "canccevik");

        let result = Coocal.getAllCookies();
        let expected = [
            { key: 'package_name', value: '"coocal"' },
            { key: 'author', value: '"canccevik"' }
        ];

        expect(result).to.eql(expected);
    });

    it("Should remove the cookie", () => {
        Coocal.setCookie("package_name", "coocal");
        Coocal.removeCookie("package_name");

        let result = Coocal.getCookie("package_name");

        expect(result).to.eql(undefined);
    });

    it("Should create a new localStorage item", () => {
        Coocal.setLocalStorageItem("package_name", "coocal");

        let result = Coocal.getLocalStorageItem("package_name");

        expect(result).to.eql("coocal");
    });

    it("Should return localStorage item's value", () => {
        Coocal.setLocalStorageItem("package_name", "coocal");

        let result = Coocal.getLocalStorageItem("package_name");
        
        expect(result).to.eql("coocal");
    });

    it("Should return undefined from localStorage item's value", () => {
        let result = Coocal.getLocalStorageItem("nonexistent_item");
        expect(result).to.eql(undefined);
    });

    it("Should return all localStorage items", () => {
        Coocal.setLocalStorageItem("package_name", "coocal");
        Coocal.setLocalStorageItem("author", "canccevik");

        let result = removeExpireDateFieldsOfLsItems(Coocal.getAllLocalStorageItems());

        let expected = [
            { key: 'author', value: 'canccevik' },
            { key: 'package_name', value: 'coocal' }
        ];
        expect(result).to.eql(expected);
    });

    it("Should remove the localStorage item", () => {
        Coocal.setLocalStorageItem("package_name", "coocal");
        Coocal.removeLocalStorageItem("package_name");

        let result = Coocal.getLocalStorageItem("package_name");
        expect(result).to.eql(undefined);
    });
});