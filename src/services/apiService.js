import Axios from 'axios';

export function getIssues(username, repo, perPage, page = 1) {
  let url = window.encodeURI(`https://api.github.com/search/issues?q=+type:issue+is:open+repo:${username}/${repo}&per_page=${perPage}&page=${page}`);

  return Axios.get(url).then(
    response => {
      return response.data;
    },
    error => {
      return Promise.reject(error);
    }
  )
}

export function getReposByUser(username) {
  let url = window.encodeURI(`https://api.github.com/search/repositories?q=+user:${username}`);

  return Axios.get(url).then(
    response => {
      return response.data.items;
    },
    error => {
      return Promise.reject(error);
    }
  )
}

export function getIssueDetail(username, repo, number) {
  let url = window.encodeURI(`https://api.github.com/repos/${username}/${repo}/issues/${number}`);

  return Axios.get(url).then(
    response => {
      return response.data;
    },
    error => {
      return Promise.reject(error);
    }
  )
}

export function getSearchLink(username, repo, perPage, page = 1) {
  return {
    pathname: '/search',
    search: `?username=${username}&repo=${repo}&per_page=${perPage}&page=${page}`
  }
}