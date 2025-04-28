import { Component, EventEmitter, OnInit } from '@angular/core';
import { TimelineComponent } from "../timeline/timeline.component";
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";
import { ApiService } from '../../services/api.service';
import { CreateGroupComponent } from '../modals/create-group/create-group.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    CommonModule,
    TimelineComponent,
    FormsModule,
    NgIf,
    NgFor,
    PagetiltleComponent,
    RouterLink,
    PaymentModalComponent
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
  searchQuery = '';
  breadCrumbItems: Array<{}> = [{ label: 'Groups', active: true }];
  groups: any[] = [];
  showPaymentModal = false;
  selectedGroup: any = null;
  isLoading = false;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.isLoading = true;
    this.apiService.getGroups(this.searchQuery).subscribe({
      next: groups => {
        this.groups = groups;
        this.isLoading = false;
      },
      error: error => {
        console.error('Error loading groups:', error);
        this.isLoading = false;
      }
    });
  }

  onSearchChange(): void {
    this.loadGroups();
  }

  toggleGroupJoin(group: any): void {
    if (group.is_member) {
      this.leaveGroup(group.id);
    } else {
      this.selectedGroup = group;
      this.openPaymentModal(this.selectedGroup)
    }
  }

  handlePaymentComplete(event: { groupId: number, success: boolean }): void {
    this.showPaymentModal = false;
    if (event.success) {
      this.joinGroup(event.groupId);
    }
  }

  joinGroup(groupId: number): void {
    this.apiService.toggleGroupMembership(groupId, 'join').subscribe({
      next: () => {
        const group = this.groups.find(g => g.id === groupId);
        if (group) {
          group.is_member = true;
          group.member_count += 1;
        }
      },
      error: error => {
        console.error('Error joining group:', error);
      }
    });
  }

  leaveGroup(groupId: number): void {
    this.apiService.toggleGroupMembership(groupId, 'leave').subscribe({
      next: () => {
        const group = this.groups.find(g => g.id === groupId);
        if (group) {
          group.is_member = false;
          group.member_count -= 1;
        }
      },
      error: error => {
        console.error('Error leaving group:', error);
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadGroups(); // Refresh groups after creation
      }
    });
  }

  isLoggedIn(): boolean {
    // Implement actual authentication check
    return !!localStorage.getItem('authToken'); // Example
  }

  openSigninModal(): void {
    this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }
  openPaymentModal(group:any): void {
    this.dialog.open(PaymentModalComponent, {
      width: '500px',
      data : { group } 
    });
  }
}