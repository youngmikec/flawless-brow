import { User } from "../../interfaces/user";

export const getItem = (key: string) => {
    // Check if code is running in browser environment
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    return null;
}
   
export const setItem = (key: string, value: any) => {
    // Check if code is running in browser environment
    if (typeof window !== 'undefined') {
        const data: string = JSON.stringify(value);
        localStorage.setItem(key, data);
    }
}

export const getFullName = (user: User | undefined ): string => {
    return (user?.fullName) ? user.fullName : 
        (!user?.fullName) ? `${user?.firstName} ${user?.lastName}` : '' ;
}

export const sortArray = (unsortedArray: any[], field: string): Array<any> => {
    const items = [...unsortedArray];
    let sortedArray: Array<any> = [];
    if(field === 'createdAt'){
        sortedArray = items.sort((a, b) => {
            const d1: any = new Date(a[field]);
            const d2: any = new Date(b[field]);
            return d1 - d2;
        });   
    }else {
        sortedArray = items.sort((a, b) => {
            return a[field] < b[field] ? -1 : 1;
        });
    }
    return sortedArray;
}

export const formatCurrency = (amount: number | undefined, currency: string | undefined, locale: string = 'en-US'): string => {
    if(amount && currency){
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
          }).format(amount);
    }else {
        // return new Intl.NumberFormat(locale, {
        //     style: 'currency',
        //     currency: currency,
        //   }).format(0);
        return '0'
    }
};

export const getTimeDifferenceFormatted = (start: string, end: string): string => {
  // Convert "HH:mm:ss" to Date objects (using today's date)
  const today = new Date().toISOString().split('T')[0];
  const startTime = new Date(`${today}T${start}`);
  const endTime = new Date(`${today}T${end}`);

  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    throw new Error('Invalid time format. Use HH:mm:ss.');
  }

  let diffMs = Math.abs(endTime.getTime() - startTime.getTime());
  const diffSecs = Math.floor(diffMs / 1000);

  if (diffSecs < 60) {
    return `${diffSecs}sec${diffSecs !== 1 ? 's' : ''}`;
  }

  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) {
    return `${diffMins}min${diffMins !== 1 ? 's' : ''}`;
  }

  const diffHrs = Math.floor(diffMins / 60);
  return `${diffHrs}hr${diffHrs !== 1 ? 's' : ''}`;
}
