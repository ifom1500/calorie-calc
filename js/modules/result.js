export class Result {
  constructor(element) {
    this.counter = element;
    this.root = element.querySelector('.result');
    this.caloriesNormOutput = this.root.querySelector('#calories-norm');
    this.caloriesMinOutput = this.root.querySelector('#calories-minimal');
    this.caloriesMaxOutput = this.root.querySelector('#calories-maximal');
  }

  _formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    // 123123123123 -> 123 123 123 123
  }

  calculate(calories) {
    this.caloriesNormOutput.textContent = this._formatNumber(calories.norm);
    this.caloriesMinOutput.textContent = this._formatNumber(calories.min);
    this.caloriesMaxOutput.textContent = this._formatNumber(calories.max);
  }

  clear() {
    this.caloriesNormOutput.textContent = 0;
    this.caloriesMinOutput.textContent = 0;
    this.caloriesMaxOutput.textContent = 0;
  }
}