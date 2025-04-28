import { Routes } from '@angular/router';
import { LandingType01Component } from './pages/landing/landing-type-01/landing-type-01.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AboutComponent } from './components/About/About.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { TutorsComponent } from './components/tutors/tutors.component';
import { TutorlistComponent } from './components/tutors-list/tutors-list.component';
import { DiscusionForumComponent } from './components/discusion-forum/discusion-forum.component';
import { AichatComponent } from './components/aichat/aichat.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ViewPostComponent } from './components/discusion-forum/view-post/view-post.component';
import { ViewAnnouncementComponent } from './components/announcements/view-announcement/view-announcement.component';
import { AuthTemplateComponent } from './components/auth/auth-template/auth-template.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { BannerComponent } from './components/cards/banner/banner.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupViewComponent } from './components/groups-view/groups-view.component';


export const routes: Routes = [
    // { path: '', component: LandingType01Component },
    {path:'auth',component:AuthTemplateComponent,
        children: [
            {path:'',redirectTo:'signin',pathMatch:'full'},
            { path: 'signin', component: LoginComponent  },
            { path: 'signup', component: SignupComponent }
    ]},
    { path: '', component: LandingType01Component,children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        { path: 'home', component: HomepageComponent },
        { path: 'about', component: AboutComponent },
        { path: 'announcements' , component:AnnouncementsComponent},
        { path: 'annoucement/:id', component:ViewAnnouncementComponent},
        { path: 'posts/:gradeId/:subjectId/:grade/:subject', component: DiscusionForumComponent },
        { path: 'view-post/:id', component: ViewPostComponent },
        { path: 'user-profile/:id', component: ProfilePageComponent },
        { path: 'ChatMate' , component:AichatComponent},
        { path: 'inbox' , component:InboxComponent},
        { path: 'groups' , component:GroupsComponent},
        { path: 'group-view/:id' , component:GroupViewComponent},






        { path: 'banner',component:BannerComponent,children:[
            
            { path: 'forum/:grade/:subject/:id', component: ViewPostComponent },
        ]},
        { path: 'tutor' , component:TutorsComponent},
        { path: 'tutors', component:TutorlistComponent},
        // { path: '**' , component:PageNotfoundComponent},
        { path: 'forum', component: DiscusionForumComponent },
        { path: "notifications", component:NotificationsComponent},
        { path: "chat", component:ChatComponent},
        { path: 'edit-profile',component:EditProfileComponent},
        // { path: 'forum/:grade/:subject/:id', component: ViewPostComponent },
    ] },
   
];
