const a = () => {
    console.log('a');
}

const b = () => {
    console.log('b');
}

const c = () => {
    console.log('c');
}

const convertTimestampToString = (timestamp) => {
    var date = new Date(timestamp.seconds * 1000);
    var options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
}

export default {
    a,
    b,
    c,
    convertTimestampToString
};