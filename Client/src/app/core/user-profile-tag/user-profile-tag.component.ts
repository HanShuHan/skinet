import {Component} from '@angular/core';
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'app-user-profile-tag',
  templateUrl: './user-profile-tag.component.html',
  styleUrls: ['./user-profile-tag.component.scss']
})
export class UserProfileTagComponent {

  constructor(protected accountService: AccountService) {
  }

  logout() {
    this.accountService.logout();
  }
}
