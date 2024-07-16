function solution(array, height) {
  var A = 0;
  for (i = 0; i < array.length; i++) {
    console.log(array[i]);
    if (array[i] < height) {
      A++;
    }
  }
  return A;
}
