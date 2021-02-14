function getNewDate(){
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	month = month > 9 ? month : '0' + month;
	let day = date.getDate();
	day = day > 9 ? day : '0' + day;
	let hh = date.getHours()
	hh = hh > 9 ? hh : '0' + hh;
	let mm = date.getMinutes()
	mm = mm > 9 ? mm : '0' + mm;
	return `${year}-${month}-${day} ${hh}:${mm}:00`;
}
export {getNewDate}