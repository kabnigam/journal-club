const React = require('react');
const hashHistory = require('react-router').hashHistory;
const ArticlesStore = require('../stores/articles_store');

const SearchIndexItem = React.createClass({
  _handleClick: function() {
    hashHistory.push(this.url);

  },

  render: function() {
    let result = '';
    let img = <img></img>;
    let url = '';
    if (this.props.user) {
      result = this.props.user.username;
      img = <img className = 'search-image' src="http://www.freeiconspng.com/uploads/profile-icon-person-user-19.png"></img>;
      this.url = `/users/${this.props.user.id}`;
    }
    else if (this.props.article) {
      result = this.props.article.title;
      img =
      <img className='search-image' src="https://cdn2.iconfinder.com/data/icons/budicon-document-2/16/3-document_-_article_news_newspaper-512.png"></img>;
      this.url = `/articles/${this.props.article.id}`;
    }
    if (result.length > 20) {
      result = result.slice(0,15) + '...';
    }
    return (
      <div className='search-index-item'>
        {img}
        <a onClick={this._handleClick} id='search-results'>{result}</a>
      </div>
    );
  }
});

module.exports = SearchIndexItem;
