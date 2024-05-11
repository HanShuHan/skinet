import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Address, LoginForm, RegistryForm, User} from "../shared/models/user";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ApiUrl} from "../../constants/api.constants";
import {add} from "ngx-bootstrap/chronos";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSource: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  userSource$: Observable<User | null> = this.userSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  register(registryForm: RegistryForm): Observable<User> {
    return this.httpClient.post<User>(ApiUrl.REGISTER, registryForm);
  }

  login(loginForm: LoginForm): Observable<void> {
    return this.httpClient.post<User>(ApiUrl.LOGIN, loginForm)
      .pipe(
        map(user => {
          if (user) {
            this.updateCurrentUser(user);
          }
        })
      );
  }

  logout() {
    this.setUserSource(null);
    localStorage.removeItem(environment.token);
    this.router.navigateByUrl('/').then();
  }

  checkEmailNotInUse(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<boolean>(ApiUrl.CHECK_EMAIL_NOT_IN_USE, {params});
  }

  updateAddress(address: Address) {
    return this.httpClient.put<Address>(ApiUrl.ADDRESS, address);
  }

  loadUserByLocalToken() {
    const userToken = localStorage.getItem(environment.token);
    if (userToken) {
      this.loadUserByToken(userToken);
    }
  }

  loadUserByToken(userToken: string) {
    const headers = new HttpHeaders().set('Authorization', `${environment.bearer} ${userToken}`);
    this.httpClient.get<User>(ApiUrl.ACCOUNT, {headers})
      .subscribe({
        next: user => {
          if (user) {
            this.updateCurrentUser(user);
          }
        },
        error: err => console.log(err)
      });
  }

  private setUserSource(user: User | null) {
    this.userSource.next(user);
  }

  getCurrentUser() {
    return this.userSource.value;
  }

  updateCurrentUser(user: User) {
    this.setUserSource(user);
    localStorage.setItem(environment.token, user.token);
  }
}
