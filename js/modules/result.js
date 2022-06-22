const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  // разряды
  // 123123123123 -> 123 123 123 123
};

export class Result {
  constructor() {}
}