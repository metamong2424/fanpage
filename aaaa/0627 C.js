// 학습목표
// 1 조금 고차원의 함수를 사용해보면서 함수를 익힐 수 있다.
// [교재 35쪽 예제]
function candrive(usr) {
    console.log("user is", usr.name);
    if (usr.age >= 16) {
        console.log("운전가능");
    }
    else {
        console.log("응~ 면허부터 따와~");
    }
}
var 사람1 = {
    name: "짱구",
    age: 10,
};
candrive(사람1);
var 사람2 = {
    name: "짱구엄마",
    age: 45,
};
candrive(사람2);
