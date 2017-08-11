import React from 'react';
import PropTypes from 'prop-types';

export default function DateFormat(props) {
  function parseDate(stringDate) {
    let date = new Date(stringDate);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

  return (
    <span>
      { parseDate(props.date) }
    </span>
  )
}

DateFormat.propTypes = {
  date: PropTypes.string.isRequired
};