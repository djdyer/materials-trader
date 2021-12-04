module.exports = {
  format_date: (date) => {
    // return `${new Date(date).getMonth() + 1}/${new Date(
    //   date
    // ).getDate()}/${new Date(date).getFullYear()}`;

    return date.toLocaleDateString(undefined, {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  },
};

