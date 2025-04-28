import { Inject, Injectable ,PLATFORM_ID } from '@angular/core';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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
     // getMessage() {
     //      return this.message;
     // }
     getMessageType() {
          return this.messageType;
     }
//============================HEADERS======================================================================

     headers = this.authToken? new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `token ${this.getAuthToken()}`
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
          // console.log(',,,,,,,,,,,,,',token)
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
          // console.log('Headers:', headers);
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
     getUser(userId:any){
          return this.http.get(this.baseUrls+ `/user/${userId}`);
     }
//================================================  ANNOUCEMENT  ================================================
     create_announcement(announcement: any): Observable<any> {
          const headers = this.getHeaders();
          return this.http.post(this.baseUrls +'/create_announcement/',announcement,{ headers });
     }
     uploadImage(file: File): Observable<{ image_url: string }> {
          const headers = this.getHeaders();
          const formData = new FormData();
          formData.append('image', file);
          return this.http.post<{ image_url: string }>(this.baseUrls +'/upload/',formData,{ headers });
        }
     getAllAnnouncements() : Observable<any>{
          return this.http.get(this.baseUrls + '/announcements/')
     }
     getAnnouncement(announcementId: any) : Observable<any>{
          return this.http.get(`${this.baseUrls}/announcement/${announcementId}/`,{ headers: this.headers });
     }
     likeAnnouncement(announcementId: string) {
          const headers = this.getHeaders();
          return this.http.post<{status: string}>(`/api/announcements/${announcementId}/like/`, {headers});
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
          console.log('.....Headers.....',headers )
          return this.http.post(`${this.baseUrls}/grades/${gradeId}/subjects/${subjectId}/posts/`, postData, { headers });
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
     getAllTutors() : Observable<any>{
          return this.http.get(this.baseUrls + '/tutors/');
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
     //===========================================================================================================

     getMessages(): Observable<any> {
          return this.http.get<any>(`${this.baseUrls}/messages/`);
     }
     
     sendMessage(message: { receiver: number, content: string }): Observable<any> {
          return this.http.post<any>(`${this.baseUrls}/messages/send/`, message);
     }
     
     getMessage(id: number): Observable<any> {
          return this.http.get<any>(`${this.baseUrls}/messages/${id}/`);
     }
     
     deleteMessage(id: number): Observable<void> {
          return this.http.delete<void>(`${this.baseUrls}/messages/${id}/delete/`);
     }
     // ==============================================================================================================
     getGroups(searchQuery: string = ''): Observable<any> {
          const headers = this.getHeaders();
          let params = new HttpParams();
          if (searchQuery) params = params.append('search', searchQuery);
          
          return this.http.get<any>(`${this.baseUrls}/groups/`, { params ,headers})
        }
      
        // Get a single group by ID
        getGroup(id: number): Observable<any> {
          return this.http.get<any>(`${this.baseUrls}/${id}`);
        }
      
        // Create a new group
        createGroup(groupData: any): Observable<any> {
          return this.http.post<any>(this.baseUrls, groupData);
        }
      
        // Update a group
        updateGroup(id: number, groupData: any): Observable<any> {
          return this.http.put<any>(`${this.baseUrls}/${id}`, groupData);
        }
      
        // Delete a group
        deleteGroup(id: number): Observable<void> {
          return this.http.delete<void>(`${this.baseUrls}/${id}`);
        }
      
        // Join or leave a group
        toggleGroupMembership(groupId: number, action: 'join' | 'leave'): Observable<any> {
          const headers = this.getHeaders();

          return this.http.post(`${this.baseUrls}/groups/${groupId}/join/`, { action ,headers});
        }
}
