import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {Path} from "../../../constants/api.constants";
import {BreadcrumbService} from "xng-breadcrumb";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit{

  constructor(private accountService: AccountService, private router: Router, protected breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.goToLoginPageWhenNotLogin();
    this.breadcrumbService.set('@account-profile', 'Profile')
  }

  private goToLoginPageWhenNotLogin() {
    if (!this.accountService.getCurrentUser()) {
      this.router.navigateByUrl(Path.LOGIN).then();
    }
  }
}
