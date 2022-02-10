import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  signupForm: FormGroup;
  genders = ['male', 'female'];
  user: User = {
    id: 0,
    name: '',
    age: 0,
    gender: '',
    job: '',
  };
  submittedProperty = false;
  // --- Edit User ----
  editMode = false;
  id: number;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.user = this.userService.getUser(this.id);
      }
    });
    if (this.editMode) {
      this.createFormEdit(this.user);
    } else {
      this.createFormNew();
    }
  }
  onSubmit() {
    this.user.id = this.signupForm.value.id;
    this.user.name = this.signupForm.value.username;
    this.user.age = this.signupForm.value.age;
    this.user.gender = this.signupForm.value.gender;
    this.user.job = this.signupForm.value.job;

    this.submittedProperty = true;
    this.signupForm.reset();
    if (this.editMode) {
      this.userService.updateUser(this.id, this.user);
    } else {
      this.userService.addUser(this.user);
    }
    this.userService.updateUserStorage();
    this.router.navigate(['/users'], { relativeTo: this.route });
  }
  createFormEdit(input) {
    this.signupForm = new FormGroup({
      id: new FormControl(input.id, [
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.required,
      ]),
      username: new FormControl(input.name, [Validators.required]),
      gender: new FormControl(input.gender, [Validators.required]),
      age: new FormControl(input.age, [
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.required,
        Validators.max(90),
      ]),
      job: new FormControl(input.job, Validators.required),
    });
  }
  createFormNew() {
    this.signupForm = new FormGroup({
      id: new FormControl(null, [
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.required,
      ]),
      username: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.required,
        Validators.max(90),
      ]),
      job: new FormControl(null, Validators.required),
    });
  }
}
