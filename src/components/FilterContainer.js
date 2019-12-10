import React from 'react';
import './FilterContainer.css';
import Version from './Version';
import Select from './Select';
import Page from '../Page';

class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    const page = new Page();
    this.state = {
      options: [
        'sourcebox',
        'all',
        't1',
        't2',
        't3',
        'ae','ae-ar', 'sa','sa-ar', 'bh','bh-ar','eg','eg-ar','jo','jo-ar','kw','kw-ar','om','om-ar','qa','qa-ar',
        'other-geos',
        "alac",
        "anz",
        "canada",
        "eu",
        "gc",
        "india",
        "japan",
        "korea",
        "me",
        "russia",
        "sea",
        "turkey",
        "us"
      ],
      geo: page.getGeo(),
      versions: page.getSources()
    };
  }

  render() {
    console.log(this.state);
    return (
      <div className="FilterContainer">
        <Select options={this.state.options} />
        <Version versions={this.state.versions} />
      </div>
    )
  }
}

export default FilterContainer;