import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { getSearchLink } from '../services/apiService';

import SearchRepos from './SearchRepos';

const itemsPerPage = [10, 20, 30, 40, 50];

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'nolimits4web',
      repo: 'Swiper',
      perPage: itemsPerPage[0]
    }
  }

  componentDidMount() {
    this.getQueryParams();
  }

  getQueryParams() {
    let querySearch = window.location.search;
    let queryParams;
    if (querySearch) {
      queryParams = queryString.parse(querySearch);

      this.setState({
        username: queryParams.username,
        repo: queryParams.repo,
        perPage: Number(queryParams.per_page)
      })
    }
  }

  updateRepo(repo) {
    this.setState({
      repo
    });
  }

  handleNumber(event) {
    let input = event.target;
    this.setState({
      [input.name]: Number(input.value)
    });
  }

  handleInput(event) {
    let input = event.target;
    this.setState({
      [input.name]: input.value
    });
  }

  render() {
    return (
      <div className="search">
        <div className="container">
          <form className="search__form">
            <div className="search__input-wrap">
              <label className="search__label" htmlFor="username">
                Пользователь
              </label>
              <div>
                <input id="username" type="text" className="search__input" name="username" value={this.state.username} onChange={this.handleInput.bind(this)}/>
              </div>
            </div>
            <div className="search__input-wrap">
              <label className="search__label" htmlFor="repo">
                Репозиторий
              </label>
              <SearchRepos username={this.state.username} perPage={this.state.perPage} value={this.state.repo} update={this.updateRepo.bind(this)} />
            </div>
            <div className="search__input-wrap">
              <label className="search__label" htmlFor="perPage">
                Результатов на странице
              </label>
              <div>
                <select className="search__input" name="perPage" id="perPage" value={this.state.perPage} onChange={this.handleNumber.bind(this)}>
                  {
                    itemsPerPage.map(item => {
                      return (
                        <option key={item} value={item}>{item}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="search__submit">
              <Link to={getSearchLink(this.state.username, this.state.repo, this.state.perPage)}>
                Поиск
              </Link>
            </div>
          </form>
        </div>

      </div>
    )
  }
}