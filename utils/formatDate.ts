export function formatDate(dateString: string | undefined): string {
	if (!dateString) return "Date not provided";
	const date: Date = new Date(dateString);

	const monthNames: string[] =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const day:number = date.getDate();
	const monthIndex:number = date.getMonth();
	const year:number = date.getFullYear();

	const getOrdinalSuffix = (day):string =>{
		if (day >3 && day < 21) return "th";

		switch(day % 10){
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }

	};

	return `${day}${getOrdinalSuffix(day)} ${monthNames[monthIndex]} ${year}`;
}