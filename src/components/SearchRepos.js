import React from 'react';
import PropTypes from 'prop-types';
import { getSearchLink } from '../services/apiService';
import { Link } from 'react-router-dom';

import { getReposByUser } from '../services/apiService';

export default class SearchRepos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      showRepos: false
    }
  }

  suggestRepos() {
    getReposByUser(this.props.username).then(
      result => {
        this.setState({
          repos: result,
          showRepos: true
        })
      }
    );
  }

  handler(event) {
    let value = event.target.value;
    this.updateRepo(value);
  }

  updateRepo(value) {
    this.setState({
      value
    });
    this.props.update(value)
  }

  hideRepos() {
    setTimeout(() => {
      this.setState({
        showRepos: false
      })
    }, 100)
  }

  render() {
    return (
      <div className="search-repos">
        <input type="text" className="search__input" name="repo" id="repo" value={this.props.value} onChange={this.handler.bind(this)} onFocus={this.suggestRepos.bind(this)} onBlur={this.hideRepos.bind(this)} />
        <div className={'search-repos__list' + (this.state.showRepos ? ' active' : '')}>
          {
            this.state.repos.filter(item => {
              let name = item.name.toLowerCase();
              let value = this.props.value.toLowerCase();
              return name.indexOf(value) !== -1
            })
              .map(item => {
                return (
                  <div className="search-repos__item" key={item.id} onClick={this.updateRepo.bind(this, item.name)}>
                    <Link to={getSearchLink(this.props.username, item.name, this.props.perPage)}>
                      { item.name }
                    </Link>
                  </div>
                )
              })
          }
        </div>
      </div>
    )
  }
}

SearchRepos.propTypes = {
  username: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired
};