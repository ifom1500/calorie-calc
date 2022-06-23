import { Result } from './result.js'

const PhysicalActivityRatio = {
  MIN: 1.2,
  LOW: 1.375,
  MEDIUM: 1.55,
  HIGH: 1.725,
  MAX: 1.9,
};

const CaloriesFormulaFactor = {
  AGE: 5,
  WEIGHT: 10,
  HEIGHT: 6.25,
};

const CaloriesFormulaConstant = {
  MALE: 5,
  FEMALE: -160,
};

const CaloriesMinMaxRatio = {
  MIN: 0.85,
  MAX: 1.15,
};

const LEAD_ZERO = /^0+/;
const NOT_NUMBERS = /[^\d]/g;

export class Counter {
  constructor(element) {
    this.root = element; // counter
    this.form = this.root.querySelector('.form'); // counter -> form
    this.elements = this.form.elements; // коллекция - все элементы формы

    this.gender = this.elements.gender; // нод-лист из радио гендер
    this.parameters = this.elements.parameters.elements; // филдсет Физ.Параметры -> коллекция элементов
    this.fieldsets = this.form.querySelectorAll('fieldset');
    this.age = this.elements.age; // физ параметры
    this.height = this.elements.height; // ---
    this.weight = this.elements.weight; // ---
    this.activity = this.elements.activity; // физ активность - радио
    this.submit = this.elements.submit;
    this.reset = this.elements.reset;

    this.parametersItems = Array.from(this.parameters);
    //  новый экземпляр Array из массивоподобного или итерируемого объекта
    // Array.from( arrayLike, function( currentValue, index ));
    // Array.from({ length: 5 }, (v, k) => k); // 0, 1, 2, 3, 4

    this._onFormInput = this._onFormInput.bind(this);
    this._onFormReset = this._onFormReset.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    // защищенное свойство
    // новая функция с привязкой контекста

    this.result = new Result(this.root);
  }

  _formatInput(input) {
    return input.value.replace(NOT_NUMBERS, '').replace(LEAD_ZERO, '');
  }

  _onFormInput() {
    this.submit.disabled = !this.form.checkValidity();
    this.reset.disabled = this.parametersItems.some((el) => el.value) ? false : true;

    this.age.value = this._formatInput(this.age);
    this.height.value = this._formatInput(this.height);
    this.weight.value = this._formatInput(this.weight);
  }

  _onFormReset() {
    this.reset.disabled = true;
    this.submit.disabled = true;
    this.result.clear();
  }

  _onFormSubmit(evt) {
    evt.preventDefault();

    const caloriesData = {
      norm: this.getCaloriesNorm(),
      min: this.getCaloriesMin(),
      max: this.getCaloriesMax(),
    };

    this.result.calculate(caloriesData);
  }

  init() {
    this.fieldsets.forEach((el) => {
      el.disabled = false;
    });

    this.form.addEventListener('input', this._onFormInput);
    this.form.addEventListener('reset', this._onFormReset);
    this.form.addEventListener('submit', this._onFormSubmit);
  }

  deinit() {
    this.fieldsets.forEach((el) => {
      el.disabled = true;
    });

    this.form.removeEventListener('input', this._onFormInput);
    this.form.removeEventListener('reset', this._onFormReset);
    this.form.removeEventListener('submit', this._onFormSubmit);
  }

  getCaloriesNorm() {
    const age = CaloriesFormulaFactor.AGE * this.age.value;
    const weight = CaloriesFormulaFactor.WEIGHT * this.weight.value;
    const height = CaloriesFormulaFactor.HEIGHT * this.height.value;
    const gender = CaloriesFormulaConstant[this.gender.value.toUpperCase()];
    const activity = PhysicalActivityRatio[this.activity.value.toUpperCase()];

    return Math.round((weight + height - age + gender) * activity);
  }

  getCaloriesMin() {
    return Math.round(this.getCaloriesNorm() * CaloriesMinMaxRatio.MIN);
  }

  getCaloriesMax() {
    return Math.round(this.getCaloriesNorm() * CaloriesMinMaxRatio.MAX);
  }
}
