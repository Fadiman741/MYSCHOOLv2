import { Inject, Injectable ,PLATFORM_ID } from '@angular/core';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

// import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root',
//   standalone:true
})
export class ApiService {

     baseUrls = 'http://localhost:8000/api';
     // private socket$: WebSocketSubject<any>;

// httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
private authToken: string | null = null;
private message: string | null = null;
private messageType: string | null = null;
     private loggedInUser: any;
     currentUser: any;

     constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: object) { 
     // this.socket$ = webSocket('ws://localhost:8000/api/notifications/')
}
     showFlashMessage(message: string, type: string) {
          this.message = message;
          this.messageType = type;

          setTimeout(() => {
          this.clearFlashMessage();
          }, 3000); // Automatically clear after 3 seconds
     }
     clearFlashMessage() {
          this.message = null;
          this.messageType = null;
     }
     getMessage() {
          return this.message;
     }
     getMessageType() {
          return this.messageType;
     }
//============================HEADERS======================================================================

     headers = this.authToken? new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.getAuthToken()}`
               })
               : new HttpHeaders({
                    'Content-Type': 'application/json'
     });
     // headers = new HttpHeaders({
     //      'Content-Type': 'application/json',
     //      Authorization: `Token ${this.getAuthToken()}`, // Replace with your token
     // });
     getHeaders(): HttpHeaders {
          const token = this.getAuthToken();
          return new HttpHeaders({
              'Content-Type': 'application/json',
              ...(token ? { 'Authorization': `Token ${token}` } : {})
          });
      }


     getAuthToken(): string | null {
          if (isPlatformBrowser(this.platformId)) {
              return localStorage.getItem("token");
          }
          return null;
      }
     // post(url:string, data:any) {
     //      return this.http.post(url, data, {
     //           headers: this.headers
     //      });
     // }
     // postData(url:string,data: any) {
     //      const headers = new HttpHeaders({
     //           'Content-Type': 'application/json',
     //           Authorization: `Token ${this.getAuthToken()}`, // Replace with your token
     //      });
     //      const options = { headers: headers };
     //      return this.http.post(this.baseUrls + url, data, options);
     // }
//========================================   AUTH   ==============================================================
     login(credentials: any): Observable<any> {
          return this.http.post(this.baseUrls + '/login/', credentials);
     }
     register(user: any): Observable<any> {
          return this.http.post(this.baseUrls+ '/signup/', user );
     }
     logout(): void {
          this.loggedInUser = null;
     }
     getLoggedInUser(): any {
          return this.loggedInUser;
     }
// ======================================================  USER ===================================================
     getCurrentUser(): Observable<any> {
          const headers = this.getHeaders();
          console.log('Headers:', headers);
     return this.http.get<any>(this.baseUrls +'/get_current_user/',{ headers});
     }
     UpdateCurrentUser(user: any): Observable<any> {
     return this.http.put<any>(this.baseUrls +'/update_current_user/',user, { headers: this.headers });
     }
//========================================  GET USER DETAILS  ==============================================================

     getLoggedInUserDetails(){
          var userId = localStorage.getItem("loggedInUserId");
          return this.http.get(this.baseUrls+ `/update-users/${userId}`);
     }
//================================================  ANNOUCEMENT  ================================================
     create_announcement(announcement: any): Observable<any> {
          const headers = this.getHeaders();
          return this.http.post(this.baseUrls +'/create_announcement/',announcement,{ headers });
     }
     getAllAnnouncements() : Observable<any>{
          return this.http.get(this.baseUrls + '/announcements/')
     }
     getAnnouncement(announcementId: any) : Observable<any>{
          return this.http.get(`${this.baseUrls}/announcement/${announcementId}/`,{ headers: this.headers });
     }
     deleteAnnouncement(announcementId: number) : Observable<any>{
          return this.http.delete(`${this.baseUrls}/announcement/${announcementId}/`,{ headers: this.headers });
     }
     // updateAnnouncement(announcementId: number, updatedData: any) : Observable<any>{
     //      return this.http.get(`${this.baseUrls}/announcement/${announcementId}/`, updatedData,{ headers: this.headers })
     // }
     updateAnnouncement(announcementId: number, updatedData: any): Observable<any> {
          return this.http.put(`${this.baseUrls}/announcement/${announcementId}/`, updatedData, { headers: this.headers });
        }
     // ===================================================================================================


     getGrades() : Observable<any>{
          return this.http.get(this.baseUrls + '/grades/')
     }
     getSubjects() : Observable<any>{
          return this.http.get(this.baseUrls + '/subjects/')
     }
//================================================POSTS================================================
     // getPosts(gradeId: number, subjectId: number): Observable<any> {
     //      return this.http.get(`${this.baseUrls}/${gradeId}/${subjectId}/`);

     // }
     getPosts(gradeId: number, subjectId: number, grade: string, subject: string): Observable<any> {
          return this.http.get(`${this.baseUrls}/posts/${gradeId}/${subjectId}/${grade}/${subject}/`);
     }

     // createPost(post: any): Observable<any> {
     //      return this.http.post(`${this.baseUrls}/create-posts/`, post,{ headers: this.headers });
     // }
     createPost(gradeId: number, subjectId: number, postData: any): Observable<any> {
          const headers = this.getHeaders();
          return this.http.post(`${this.baseUrls}/grades/${gradeId}/subjects/${subjectId}/`, postData,{ headers});
     }
     // createPost(formData: FormData): Observable<any> {
     // const headers = new HttpHeaders().set('enctype', 'multipart/form-data');
     // return this.http.post(this.apiUrl, formData, { headers });
     // }
     
     create_posts(post: any): Observable<any> {
          return this.http.post(this.baseUrls +'/create_post/',post,{ headers: this.headers });
     }
     getAllPosts() : Observable<any>{
          return this.http.get(this.baseUrls + '/posts/');
          }
     getPostById(postId: any): Observable<any> {    
          return this.http.get(`${this.baseUrls}/post/${postId}/`,{ headers: this.headers });
     }
     deletePost(postId: any): Observable<any> {    
          return this.http.delete(`${this.baseUrls}/post/${postId}/`,{ headers: this.headers });
     }
     updatePost(postId: any): Observable<any> {    
          return this.http.put(`${this.baseUrls}/post/${postId}/`,{ headers: this.headers });
     }
     likePost(postId: any): Observable<any> {    
          return this.http.post(`${this.baseUrls}/post/${postId}/like/`,{ headers: this.headers });
     }
     DislikePost(postId: any): Observable<any> {    
          return this.http.post(`${this.baseUrls}/post/${postId}/dislike/`,{ headers: this.headers });
     }
//================================================USERS================================================
     getAllUsers() : Observable<any>{
          return this.http.get(this.baseUrls + '/users/');
          }
     getUserById(userID: number): Observable<any> {    
          return this.http.get(`${this.baseUrls}/update-users/${userID}`);
     }
     //================================================COMMENTS================================================
     
     // create_comments(announcement: any): Observable<any> {
     //      return this.http.post(this.baseUrls+'/create_comment/',announcement,{ headers: this.headers });
     //      }
     create_comments(postId: number, commentData: any): Observable<any> {
          console.log(commentData,postId)
          return this.http.post(`${this.baseUrls}/posts/${postId}/comments/`, commentData, { headers: this.headers });
     }
     getCommentsByPost(postId: number): Observable<any> {
          return this.http.get(`${this.baseUrls}/comments/${postId}/`)
     }
     getAllcomments() : Observable<any>{
          return this.http.get(this.baseUrls + '/comments/')
          }
     getCommentById(commentId: number): Observable<any> {
          return this.http.get(`${this.baseUrls}/comment/${commentId}`);
     }
     deleteComment(commentId: number): Observable<any> {
          return this.http.delete(`${this.baseUrls}/comment/${commentId}`,{ headers: this.headers });
     }
     updateComment(commentId: number): Observable<any> {
          return this.http.put(`${this.baseUrls}/comment/${commentId}`,{ headers: this.headers });
     }
//================================================NOTIFICATIONS================================================

     getAllNotifications() : Observable<any>{
          return this.http.get(this.baseUrls + '/notifications/');
          };

     // getNotificationById(userID: number): Observable<any> {    
     //      return this.http.delete(`${this.baseUrls}/notifications/${userID}`);
     // }
     getNewAnnouncements(lastCheckTime: string): Observable<any[]> {
          return this.http.get<any[]>(`/api/announcements/?last_check_time=${lastCheckTime}`);
     }
     // ==========================================================================================================
     Ai_chat(message: string): Observable<any> {
          return this.http.post<any>(this.baseUrls + '/aichat/', { message },{ headers: this.headers });
  }
}
