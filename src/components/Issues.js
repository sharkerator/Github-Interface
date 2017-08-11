import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import User from './User';
import DateFormat from './DateFormat';
import Loader from './Loader';
import Error from './Error';
import Pagination from './Pagination';
import { getIssues } from '../services/apiService';

function IssueItem(props) {
  let item = props.item;

  return (
    <div className="issues__item">
      <div className="issues__user">
        <User data={item.user} />
      </div>
      <div className="issues__content">
        <div className="issues__title">
          <Link to={{
            pathname: '/detail',
            search: `?username=${props.username}&repo=${props.repo}&id=${item.number}`
          }}>
            { item.title }
          </Link>
        </div>
        <div className="issues__number">
          #{ item.number }
        </div>
        <div className="issues__date">
          <DateFormat date={item.created_at} />
        </div>
      </div>
    </div>
  )
}

IssueItem.propTypes = {
  item: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired
};

export default class Issues extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loading: true,
      issues: [],
      username: '',
      repo: '',
      perPage: null,
      activePage: 1,
      totalCount: null
    }
  }

  componentDidMount() {
    this.init()
  }

  componentDidUpdate() {
    this.init()
  }

  init() {
    let queryParams = queryString.parse(this.props.location.search);

    if (queryParams.username !== this.state.username || queryParams.repo !== this.state.repo || queryParams.per_page != this.state.perPage || queryParams.page != this.state.activePage) {
      this.setState({
        error: null,
        loading: true,
        username: queryParams.username,
        repo: queryParams.repo,
        perPage: Number(queryParams.per_page),
        activePage: Number(queryParams.page)
      }, this.getList)
    }
  }

  getList() {
    getIssues(this.state.username, this.state.repo, this.state.perPage, this.state.activePage).then(
      result => {
        let issues = result.items;
        if (issues.length) {
          this.setState({
            error: null,
            issues,
            loading: false,
            totalCount: result.total_count
          })
        }
        else {
          this.setState({
            error: 'В данном репозитории нет Issues',
            issues: [],
            loading: false
          })
        }

      },
      error => {
        this.setState({
          error: 'Ошибка в имени пользователя или в названии репозитория'
        })
      }
    )
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

    return (
      <div className="container">
        <div className="issues">
          {
            this.state.issues.map((item) => {
              return (
                <IssueItem key={item.id} item={item} username={this.state.username} repo={this.state.repo} />
              )
            })
          }
        </div>
        {
          this.state.totalCount > this.state.perPage ?
            <Pagination activePage={this.state.activePage} total={this.state.totalCount} perPage={this.state.perPage} linkParams={[this.state.username, this.state.repo]} /> :
            null
        }
      </div>
    )
  }
}

Issues.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
};