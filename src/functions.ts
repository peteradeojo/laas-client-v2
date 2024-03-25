function pad(str: any, length = 2, fill = '0'): string {
	return String(str).padStart(length, fill);
}

// function resolveDay(day: number): string {
// 	switch (day) {
// 		case 1:
// 			return 'Sunday';
// 		case 2:
// 			return 'Monday';
// 		case 3:
// 			return 'Tuesday';
// 		case 4:
// 			return 'Wednesday';
// 		case 5:
// 			return 'Thursday';
// 		case 6:
// 			return 'Friday';
// 		case 7:
// 			return 'Saturday';
// 		default:
// 			return '';
// 	}
// }

export function dateToString(date: Date | string): string {
	if (!date) {
		return date;
	}
	if (typeof date == 'string') {
		date = new Date(date);
	}

	return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}
  
  ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${
		date.getHours() > 11 ? 'PM' : 'AM'
	}
  `;
}
