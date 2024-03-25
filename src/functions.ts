function pad(str: any, length = 2, fill = '0'): string {
	return String(str).padStart(length, fill);
}

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
