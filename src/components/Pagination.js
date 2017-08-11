import React from 'react';
import { Link } from 'react-router-dom';
import { getSearchLink } from '../services/apiService';
import PropTypes from 'prop-types';

export default function Pagination(props) {
  let pagesNumber = Math.ceil(props.total / props.perPage);
  let pages = [];
  const range = 3;

  for (let i = 1; i <= pagesNumber; i++) {
    if ((i >= props.activePage - range && i <= props.activePage + range) || i == 1 || i == pagesNumber) {
      pages.push({
        value: i,
        link: getSearchLink(...props.linkParams, props.perPage, i),
        isActive: i == props.activePage
      })
    }
  }

  return (
    <div className="pagination">
      {
        props.activePage > 1 ?
          <div className="pagination__item">
            <Link to={getSearchLink(...props.linkParams, props.perPage, props.activePage - 1)}>
              Предыдущая
            </Link>
          </div>
          : null
      }
      {
        pages.map(item => {
          return (
            <div key={item.value} className='pagination__item'>
              {
                !item.isActive ?
                  <Link to={item.link}>
                    { item.value }
                  </Link>
                  :
                  <span>
                    { item.value }
                  </span>
              }
            </div>
          )
        })
      }
      {
        props.activePage < pagesNumber ?
          <div className="pagination__item">
            <Link to={getSearchLink(...props.linkParams, props.perPage, props.activePage + 1)}>
              Следующая
            </Link>
          </div>
          : null
      }
    </div>
  )
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  linkParams: PropTypes.arrayOf(PropTypes.string).isRequired
};