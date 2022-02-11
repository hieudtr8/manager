import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [];
  usersChanged = new Subject<User[]>();
  constructor() {
    if (localStorage.getItem('listUsers')) {
      this.users = this.getUserStorage();
    }
  }
  getUsers() {
    return this.users;
  }
  getUser(id: number) {
    return this.users.find((obj) => obj.id === id);
  }
  addUser(user: User) {
    this.users.push(
      new User(user.id, user.gender, user.name, user.age, user.job)
    );
    this.usersChanged.next(this.users.slice());
  }
  updateUser(id, user) {
    let updateIndex = this.users.findIndex((obj) => obj.id == id);
    this.users[updateIndex] = user;
    this.updateUserStorage();
  }
  deleteUser(id) {
    let deleteIndex = this.users.findIndex((obj) => obj.id == id);
    this.users.splice(deleteIndex);
    this.updateUserStorage();
  }
  updateUserStorage() {
    localStorage.setItem('listUsers', JSON.stringify(this.users));
  }
  getUserStorage() {
    return JSON.parse(localStorage.getItem('listUsers'));
  }
}
