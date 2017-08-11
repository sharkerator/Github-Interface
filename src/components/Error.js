import React from 'react';

export default function Error(props) {
  return (
    <div className="container">
      <div className="error">
        { props.children }
      </div>
    </div>
  )
}