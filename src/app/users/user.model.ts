export class User {
  public id: number;
  public name: string;
  public age: number;
  public gender: string;
  public job: string;

  constructor(
    id: number,
    gender: string,
    name: string,
    age: number,
    job: string
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.job = job;
  }
}
