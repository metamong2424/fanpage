// 클래스 정의
class Person {
  // 생성자: 객체가 생성될 때 호출됩니다.
  constructor(name, age) {
    this.name = name; // name 속성 초기화
    this.age = age; // age 속성 초기화
  }

  // 메소드: 객체가 할 수 있는 동작을 정의합니다.
  introduce() {
    console.log(
      `안녕하세요, 제 이름은 ${this.name}이고, 나이는 ${this.age}살입니다.`
    );
  }
}

// 객체 생성: 클래스를 사용하여 객체를 만듭니다.
const tom = new Person("Tom", 25);

// 메소드 호출: 객체의 메소드를 호출합니다.
tom.introduce(); // 출력: 안녕하세요, 제 이름은 Tom이고, 나이는 25살입니다.
