import moment from 'moment';

export const sortString = (a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
    }
    return 0;
}

export const getTime = (dateStr) => {
    if (!dateStr) return 0;
    const date = new Date(moment(dateStr, 'YYYY年MM月DD日').format('YYYY-MM-DD'));
    return date;
};

export const sortByDueDate = (a, b) => {
    const timeA = getTime(a);
    const timeB = getTime(b);
    const diff = timeA - timeB;
    if (diff < 0) {
        return -1;
    }
    if (diff > 0) {
        return 1;
    }
    return 0;
};