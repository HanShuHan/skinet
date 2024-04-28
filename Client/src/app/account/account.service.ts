import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LoginForm, RegistryForm, User} from "../shared/models/user";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = environment.apiUrl + environment.accountPath;
  private userSource: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public userSource$: Observable<User | null> = this.userSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    this.loadUserByLocalToken();
  }

  register(registryForm: RegistryForm): Observable<void> {
    return this.httpClient.post<User>(this.baseUrl + 'register', registryForm)
      .pipe(
        map(user => {
          this.updateUser(user);
          this.router.navigateByUrl('/shop').then();
        })
      );
  }

  login(loginForm: LoginForm): Observable<void> {
    return this.httpClient.post<User>(this.baseUrl + 'login', loginForm)
      .pipe(
        map(user => {
          if (user) {
            this.updateUser(user);
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
    return this.httpClient.get<boolean>(this.baseUrl + environment.paths.emailNotInUse, {params});
  }

  private loadUserByLocalToken() {
    const userToken = localStorage.getItem(environment.token);
    if (userToken) {
      const headers = new HttpHeaders().set('Authorization', `${environment.bearer} ${userToken}`);
      this.httpClient.get<User>(this.baseUrl, {headers})
        .subscribe({
          next: user => {
            if (user) {
              this.updateUser(user);
            }
          },
          error: err => console.log(err)
        });
    }
  }

  private setUserSource(user: User | null) {
    this.userSource.next(user);
  }

  private updateUser(user: User) {
    this.setUserSource(user);
    localStorage.setItem(environment.token, user.token);
  }
}
