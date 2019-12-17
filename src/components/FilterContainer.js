import React from 'react';
import './FilterContainer.css';
import Version from './Version';
import Select from './Select';
import Page from '../Page';

class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    const page = new Page();
    let thisPage = page.getGeo();
    this.state = {
      options: [
        thisPage,
        'sourcebox',
        'all geos',
        'ae-ar',
        'ae',
        'english',
        'arabic',
        't1',
        't2',
        't3',
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
      versions: page.getSources(),
      visible: false, // don't show the toggle by default
    };

    this.toggleForm = this.toggleForm.bind(this);

  }

  toggleForm = function(e) {
    this.setState((prevState) => {
      return {
        visible: !prevState.visible
      }
    })
  }



  render() {
    return (
      <div className={'FilterContainer ' + ((this.state.visible) ? 'visible' : 'hidden')}>
        <Select options={this.state.options} />
        <Version versions={this.state.versions} toggleForm={this.toggleForm} />
      </div>
    )
  }
}

export default FilterContainer;