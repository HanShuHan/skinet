import {Component} from '@angular/core';
import {AccountService} from "../../account/account.service";
import {Path} from "../../../constants/api.constants";

@Component({
  selector: 'app-user-account-profile-tag',
  templateUrl: './account-profile-tag.component.html',
  styleUrls: ['./account-profile-tag.component.scss']
})
export class AccountProfileTagComponent {

  protected readonly Path = Path;

  constructor(protected accountService: AccountService) {
  }

  logout() {
    this.accountService.logout();
  }

}
