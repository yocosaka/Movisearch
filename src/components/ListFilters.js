import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTitleFilter, setPeriodFilter } from '../actions/filters';

class ListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onPeriodChange = this.onPeriodChange.bind(this);
    this.state = {
      title: '',
      period: '',
      error: '',
    };
  }

  onTitleChange = (e) => {
    const { setTitleFilter } = this.props;
    const title = (e.target.value).trim();
    if (title.match(/^[a-zA-Z0-9]{0,15}$/)) {
      this.setState(() => ({ title }));
      this.setState(() => ({ error: '' }));
      setTitleFilter(title);
    } else {
      this.setState(() => ({
        error: 'Title should be provided less than 15 characters.',
      }));
    }
  }

  onPeriodChange = (e) => {
    const { setPeriodFilter } = this.props;
    const period = e.target.value;
    this.setState(() => ({ period }));
    if (period.match(/^[0-9]{4}$/) && period >= 1800) {
      this.setState(() => ({ error: '' }));
      setPeriodFilter(period);
    } else {
      this.setState(() => ({
        error: 'Period should be provided 4 digit year number between 1800 and 2020.',
      }));
    }
  }

  render() {
    const {
      title, period, error,
    } = this.state;
    return (
      <div>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Input keyword to search movies by title"
          value={title}
          onChange={this.onTitleChange}
        />
        <input
          type="number"
          min="1800"
          max="2020"
          step="10"
          onChange={this.onPeriodChange}
          placeholder="Input the period to search movies"
          value={period}
        />
        <button type="submit">Search</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setTitleFilter: (title) => dispatch(setTitleFilter(title)),
  setPeriodFilter: (period) => dispatch(setPeriodFilter(period)),
});

ListFilters.propTypes = {
  setTitleFilter: PropTypes.func,
  setPeriodFilter: PropTypes.func,
};

ListFilters.defaultProps = {
  setTitleFilter: null,
  setPeriodFilter: null,
};

export default connect(undefined, mapDispatchToProps)(ListFilters);
