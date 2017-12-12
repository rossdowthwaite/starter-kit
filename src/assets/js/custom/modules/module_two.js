class ModuleTwo {
  constructor(one, two) {
    this.one = one;
    this.two = two;
  }

  sayThings() {
    console.log(`${this.one}, ${this.two}`);
  }
}

export default ModuleTwo
