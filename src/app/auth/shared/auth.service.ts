import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { JwtHelperService } from "@auth0/angular-jwt"
import { Router } from '@angular/router'
import * as moment from 'moment'


const jwt = new JwtHelperService()


class DecodedToken {
  userId: string = ''
  username: string = ''
  exp: number = 0
}

@Injectable()
export class AuthService {

  private decodedToken: any
  private router: Router

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('app-meta')) || new DecodedToken()
  }

  getToken() {
    return localStorage.getItem('app-auth')
  }

  // JWTトークンが有効期限内かどうかを判断する
  isAuthenticated() {
    return moment().isBefore(moment.unix(this.decodedToken.exp))
  }

  //新規会員登録ボタンを押した時、フォームの内容をバックエンドに送る  
  register(userData: any): Observable<any> {
     return this.http.post('/api/v1/users/register', userData)
  }

  //ログインボタンを押した時、フォームの内容をバックエンドに送る
  login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/login', userData).pipe(map(
      // JWTトークンをローカルストレージに保存
      (token: string) => {
        this.decodedToken = jwt.decodeToken(token)
        localStorage.setItem('app-auth', token)
        localStorage.setItem('app-meta', JSON.stringify(this.decodedToken))
        return token
      }
    ))
  }

  // ログアウトボタンを押した時、ローカルストレージに保存しているトークンを削除、初期化
  logout() {
    localStorage.removeItem('app-auth')
    localStorage.removeItem('app-meta')
    this.decodedToken = new DecodedToken()
    
    this.router.navigate(['/login'])
  }
}