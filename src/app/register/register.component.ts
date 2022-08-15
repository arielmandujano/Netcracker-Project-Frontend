import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from '../dataModels/new-user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName!: string;
  lastName!: string;
  userName!: string;
  address!: string;
  email!: string;
  phoneNumber!: string;
  password!: string;
  picture!: string;
  role: string = "User";

  createUserForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createGroup();
  }

  createGroup() {
    this.createUserForm = new FormGroup({
      firstName : new FormControl(this.firstName, Validators.required),
      lastName : new FormControl(this.lastName, Validators.required),
      userName : new FormControl(this.userName, Validators.required),
      address : new FormControl(this.address, Validators.required),
      email : new FormControl(this.email, [Validators.required, Validators.email]),
      phoneNumber : new FormControl(this.phoneNumber, Validators.required),
      password : new FormControl(this.password, Validators.required),
      picture : new FormControl(this.picture),
      role : new FormControl(this.role)
    });
  }

  async onCreate(form: NewUser) {
    form.picture = null;
    form.role = "User";
    this.authService.newUser(form).subscribe( response => {
      console.log(response);
      alert("User created: " + response);
      window.location.reload();
    });
  }

}
