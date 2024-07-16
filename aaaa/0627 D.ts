// 과일 클래스
class 과일 {
  constructor(public 이름: string) {}

  맛을묘사(): void {
    console.log(`${this.이름}은(는) 맛이 없습니다.`);
  }
}

// 바나나 클래스
class 바나나 extends 과일 {
  constructor() {
    super("바나나");
  }

  맛을묘사(): void {
    console.log(`${this.이름}은(는) 맛있습니다.`);
  }
}

// 사과 클래스
class 사과 extends 과일 {
  constructor() {
    super("사과");
  }

  맛을묘사(): void {
    console.log(`${this.이름}은(는) 맛있습니다.`);
  }
}

// 객체 생성 및 테스트
let 바나나객체 = new 바나나();
let 사과객체 = new 사과();

바나나객체.맛을묘사(); // 출력: "바나나은(는) 맛있습니다."
사과객체.맛을묘사(); // 출력: "사과은(는) 맛있습니다."

// 다형성을 이용하여 배열에 여러 종류의 과일을 담을 수 있습니다.
let 과일들: 과일[] = [바나나객체, 사과객체];

과일들.forEach((과일) => {
  과일.맛을묘사();
});
