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
// 과일 클래스
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
        console.log("".concat(this.이름, "\uC740(\uB294) \uB9DB\uC788\uC2B5\uB2C8\uB2E4."));
    };
    return 바나나;
}(과일));
// 사과 클래스
var 사과 = /** @class */ (function (_super) {
    __extends(사과, _super);
    function 사과() {
        return _super.call(this, "사과") || this;
    }
    사과.prototype.맛을묘사 = function () {
        console.log("".concat(this.이름, "\uC740(\uB294) \uB9DB\uC788\uC2B5\uB2C8\uB2E4."));
    };
    return 사과;
}(과일));
// 객체 생성 및 테스트
var 바나나객체 = new 바나나();
var 사과객체 = new 사과();
바나나객체.맛을묘사(); // 출력: "바나나은(는) 맛있습니다."
사과객체.맛을묘사(); // 출력: "사과은(는) 맛있습니다."
// 다형성을 이용하여 배열에 여러 종류의 과일을 담을 수 있습니다.
var 과일들 = [바나나객체, 사과객체];
과일들.forEach(function (과일) {
    과일.맛을묘사();
});
