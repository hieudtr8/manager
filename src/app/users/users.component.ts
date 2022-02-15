import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { User } from '../model/user.model';
import { UsersService } from '../service/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  id: number;
  currentRoute: string;
  listDisplay: User[];
  displayTable: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    // On first load page URL
    this.route.url.subscribe((segments) => {
      this.currentRoute = '/' + segments[0].path;
      if (this.currentRoute == '/users') {
        this.displayTable = true;
        this.listDisplay = this.usersService.getUsers();
        console.log(this.listDisplay)
      } else {
        this.displayTable = false;
      }
    });
    // On event change URL
    this.router.events.subscribe((event) => {
      this.currentRoute = this.router.url;
      if (this.currentRoute == '/users') {
        this.displayTable = true;
        this.listDisplay = this.usersService.getUsers();
      } else {
        this.displayTable = false;
      }
    });
  }

  onNewUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
