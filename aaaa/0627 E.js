var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var 과일 = /** @class */ (function () {
    function 과일(이름) {
        this.이름 = 이름;
    }
    과일.prototype.맛을묘사 = function () {
        console.log("".concat(this.이름, "\uC740(\uB294) \uB9DB\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."));
    };
    return 과일;
}());
// 바나나 클래스
var 바나나 = /** @class */ (function (_super) {
    __extends(바나나, _super);
    function 바나나() {
        return _super.call(this, "바나나") || this;
    }
    바나나.prototype.맛을묘사 = function () {
        console.log("".concat(this.이름, "\uC740(\uB294) \uB9DB\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."));
    };
    바나나.prototype.색상을묘사 = function () {
        console.log("".concat(this.이름, "\uC740(\uB294) \uB178\uB780\uC0C9\uC785\uB2C8\uB2E4."));
    };
    return 바나나;
}(과일));
var 바나나객체 = new 바나나();
바나나객체.맛을묘사(); // 출력: "바나나은(는) 맛있습니다."
바나나객체.색상을묘사();
// 다형성을 이용하여 배열에 여러 종류의 과일을 담을 수 있습니다.
var 과일들 = [바나나객체];
과일들.forEach(function (과일) {
    과일.맛을묘사();
});
