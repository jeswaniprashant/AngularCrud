import { UserService } from './../../user.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  modalRef: BsModalRef;
  user: User = new User();
  users: any;
  editUser: any;
  errorMsg: ErrorMsg = new ErrorMsg();
  id = {'id': ''};

  constructor(private modalService: BsModalService, private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.get().subscribe(res => {
      this.users = res;
      console.log(this.users);
    }, error => {
      console.log(error);
    });
  }

  onSave() {
    this.errorMsg.name = this.errorMsg.address = '';
    !this.user.name ? this.errorMsg.name = 'Name Required' :'';
    !this.user.address ? this.errorMsg.address = 'Address Required' :'';
    if (!this.user.name || !this.user.address) {
      return;
    }

    this.userService.post(this.user)
    .subscribe(res => {
      this.getUser();
      this.modalRef.hide();
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalDelete(template: TemplateRef<any>, id) {
    this.id.id = id;
    this.modalRef = this.modalService.show(template);
  }

  deleteUser() {
    this.userService.delete(this.id)
    .subscribe(res => {
      this.getUser();
      this.modalRef.hide();
    }, error => {
      console.log(error);
    });
  }

  onUpdate() {
    this.userService.update(this.editUser)
    .subscribe(res => {
      this.getUser();
      this.modalRef.hide();
    }, error => {
      console.log(error);
    });
  }

  openModalEdit(template: TemplateRef<any>, user) {
    this.modalRef = this.modalService.show(template);
    this.editUser = user;
  }

}

class User {
  name: string;
  address: string;
}


class ErrorMsg {
  name: string;
  address: string;
}
