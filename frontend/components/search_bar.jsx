const React = require('react');
const ArticlesActions = require('../actions/articles_actions');
const SessionActions = require('../actions/session_actions');
const SearchIndexItem = require('./search_index_item');
const SearchStore = require('../stores/search_store');
const GroupsActions = require('../actions/groups_actions');

const SearchBar = React.createClass({
  getInitialState: function() {
    return {search: '', user_results: [], article_results: [], group_results: []};
  },
  componentDidMount: function() {
    this.listener = SearchStore.addListener(this._onChange);
    $('.search-content').hide();
    $(document).on('click', e => {
      if (e.target.id != 'search-field' || e.target.id != 'search-results'){
        $('.search-content').hide();
      } else {
        $('.search-content').show();
      }
    });
  },
  _onChange: function() {

    this.setState({user_results: SearchStore.all_users()});
    this.setState({article_results: SearchStore.all_articles()});
    this.setState({group_results: SearchStore.all_groups()});
  },
  componentWillUnmount: function() {
    this.listener.remove();
    // $(document).removeEventListener('click');
  },
  _handleSearch: function(e) {

    this.setState({search: e.target.value});

    SessionActions.searchUsers(e.target.value);
    ArticlesActions.searchArticles(e.target.value);
    GroupsActions.searchGroups(e.target.value);
  },
  _handleClick: function() {
    $('.search-content').hide();
  },
  _handleFieldClick: function(e) {
    $('.search-content').show();
  },
  render: function() {

    let user_results = [];
    let article_results = [];
    let group_results = [];
    let i = 0;
    if (this.state.user_results) {
      user_results = this.state.user_results.map(result => {
        i++;
        return <SearchIndexItem key={`${i}${result.id}`} user={result} />;
      });
    }
    if (this.state.article_results) {
      article_results = this.state.article_results.map(result => {
        i++;
        return <SearchIndexItem key={`${i}${result.id}`} article={result} />;
      });
    }
    if (this.state.group_results) {
      group_results = this.state.group_results.map(result => {
        i++;
        return <SearchIndexItem key={`${i}${result.id}`} group={result} />;
      });
    }

    return (
      <div className='nav-search-bar'>
        <input className='search-field' value={this.state.search} onChange={this._handleSearch} placeholder='Search...' onClick={this._handleFieldClick}/>
        <div className="dropdown-content search-content" id='search-field' onClick={this._handleClick}>

          {user_results}
          {article_results}
          {group_results}
        </div>
      </div>

    );
  },

});

module.exports = SearchBar;
