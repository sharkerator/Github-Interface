import React from 'react';
import queryString from 'query-string';
import User from './User';
import DateFormat from './DateFormat';
import Loader from './Loader';
import Error from './Error';
import { getIssueDetail } from '../services/apiService';

export default class Issue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loading: true,
      data: null
    }
  }

  componentDidMount() {
    let queryParams = queryString.parse(this.props.location.search);

    getIssueDetail(queryParams.username, queryParams.repo, queryParams.id).then(
      data => {
        this.setState({
          data,
          loading: false
        })
      },
      error => {
        this.setState({
          error: 'Issue не найдено'
        })
      }
    );
  }

  render() {
    if (this.state.error) {
      return (
        <Error>
          { this.state.error }
        </Error>
      )
    }

    if (this.state.loading) {
      return (
        <Loader />
      )
    }

    let data = this.state.data;
    return (
      <div className="container">
        { data ?
          <div className="issue">
            <div className="issue__user">
              <User data={data.user} />
            </div>
            <div className="issue__info">
              <div className="issue__title">
                { data.title }
              </div>
              <div className="">
                Создан: <DateFormat date={data.created_at} />
              </div>
              <a href={data.html_url} className="issue__link">
                Полная версия
              </a>
            </div>
            <div className="issue__body">
              { data.body }
            </div>
          </div>
          : null
        }
      </div>
    )
  }
}