import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastSeen'
})
export class LastSeenPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return 'Never';
    }

    const currentDate = new Date();
    const lastSeenDate = new Date(value);
    const timeDifference = currentDate.getTime() - lastSeenDate.getTime();

    if (timeDifference < 60000) { // Less than a minute
      return 'Just now';
    } else if (timeDifference < 3600000) { // Less than an hour
      const minutesAgo = Math.floor(timeDifference / 60000);
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < 86400000) { // Less than a day
      const hoursAgo = Math.floor(timeDifference / 3600000);
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else { // More than a day
      const daysAgo = Math.floor(timeDifference / 86400000);
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    }
  }
}