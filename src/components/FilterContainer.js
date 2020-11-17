import React from 'react';
import styles from './FilterContainer.module.css';
import Version from './Version';
import Page from '../Page';
import GeoSwitcher from './GeoSwitcher';

class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    const page = new Page();
    this.state = {
      options: [
        { type: 'geo-alt', name: 'geo-alt'},
        { type: 'sb', name: 'sb'},
        { type: 'me', name: 'ae'},
        { type: 'me', name: 'ae-ar'},
        { type: 'me', name: 'sa'},
        { type: 'me', name: 'sa-ar'},
        { type: 'no-tv', name: 'no-tv'},
        { type: 'no-watch', name: 'no-watch'},
        { type: 'english', name: 'english'},
        { type: 'arabic', name: 'arabic'},
        { type: 'us', name: 'us'},
        { type: 'pool', name: 'rand'},
      ],
      geo: page.getGeo(),
      versions: page.getSources(),
      visible: true, 
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
      <div className={styles.FilterContainer + ' ' + ((this.state.visible) ? styles.FilterContainerVisible : styles.FilterContainerHidden)}>
        <Version versions={this.state.versions} toggleForm={this.toggleForm} />
        <GeoSwitcher options={this.state.options} />
      </div>
    )
  }
}

export default FilterContainer;