import { NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  imports: [RouterLink,NgFor,NgIf],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LeftMenuComponent {

  menuItems: Array<{
    name: string;
    icon: string;
    link?: string;
    children?: { name: string; link: string }[];
    open?: boolean; // Add the open property
  }> = [
    { name: 'Dashboard', icon: 'home', link: '/dashboard' },
    {
      name: 'Properties',
      icon: 'building',
      link: '/property-listing',
      children: [
        { name: 'Add Property', link: '/add-property' },
        { name: 'Manage Properties', link: '/property-listing' },
        { name: 'Property Reports', link: '/property-report' },
      ],
      open: false,
    },
    { name: 'Agents', icon: 'users', link: '/agents' },
    {
      name: 'Analytics',
      icon: 'chart-bar',
      children: [
        { name: 'Reports', link: '/analytics/reports' },
        { name: 'Performance', link: '/analytics/performance' },
        { name: 'Revenue Insights', link: '/analytics/revenue' },
      ],
      open: false,
    },
    {
      name: 'Settings',
      icon: 'cog',
      children: [
        { name: 'Profile Settings', link: '/settings/profile' },
        { name: 'Account Settings', link: '/settings/account' },
        { name: 'System Preferences', link: '/settings/system' },
      ],
      open: false,
    },
    {
      name: 'Support',
      icon: 'life-ring',
      children: [
        { name: 'FAQs', link: '/support/faqs' },
        { name: 'Contact Support', link: '/support/contact' },
      ],
      open: false,
    },
    { name: 'Sign Out', icon: 'sign-out-alt', link: '/sign-in' },
  ];
  
  
  toggleDropdown(item: any): void {
    // Close other dropdowns
    this.menuItems.forEach(menu => {
      if (menu !== item) {
        menu.open = false;
      }
    });
  
    // Toggle the clicked dropdown
    item.open = !item.open;
  }
  

}
