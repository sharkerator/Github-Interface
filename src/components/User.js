import React from 'react';
import PropTypes from 'prop-types';

export default function User(props) {

  return (
    <div className="user">
      <a className="user__image-wrap" href={props.data.html_url}>
        <img src={props.data.avatar_url} alt=""/>
      </a>
      <a className="user__name" href={props.data.html_url}>
        { props.data.login }
      </a>
    </div>
  )
}

User.propTypes = {
  data: PropTypes.object.isRequired
};