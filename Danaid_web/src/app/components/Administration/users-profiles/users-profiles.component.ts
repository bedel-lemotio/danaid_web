import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user.model';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-profiles',
  templateUrl: './users-profiles.component.html',
  styleUrls: ['./users-profiles.component.scss']
})
export class UsersProfilesComponent implements OnInit {

  defaulProfilePicture = 'https://firebasestorage.googleapis.com/v0/b/danaidapp.appspot.com/o/user-profil.png?alt=media&token=10fc4c1d-7f22-48b8-897d-e5a973721628'
  userList: User[] = [];
  constructor(private userService: UserServiceService) { }
  validatingForm: FormGroup;
  ngOnInit() {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
    this.loadData();
  }

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  // chargement des donnees
  loadData() {
    this.userList = [];
    this.userService.getAllUser().subscribe(data => {
      this.userList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });
    });
  }

  // enable/desable user
  enableOrdisableUser(user: User, operation: number) {
    if (operation === 1) {
      user.enabled = true;
    } else {
      user.enabled = false;
    }
    this.updateUser(user);
  }

  // creation d'un user
  createNewUser(user: User) {
    this.userService.creatUser(user);
  }

  // modification d'un user
  updateUser(user: User) {
    this.userService.updateUser(user);
  }

  // suppression d'un user
  deleteUser(user: User) {
    this.userService.deleteUser('' + user.phoneList[0].number);
  }
}
