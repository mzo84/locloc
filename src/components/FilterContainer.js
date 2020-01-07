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
        { type: 'me', name: 'ae'},
        { type: 'me', name: 'ae-ar'},
        { type: 'me', name: 'bh'},
        { type: 'me', name: 'bh-ar'},
        { type: 'me', name: 'eg'},
        { type: 'me', name: 'eg-ar'},
        { type: 'me', name: 'jo'},
        { type: 'me', name: 'jo-ar'},
        { type: 'me', name: 'kw'},
        { type: 'me', name: 'kw-ar'},
        { type: 'me', name: 'om'},
        { type: 'me', name: 'om-ar'},
        { type: 'me', name: 'sa'},
        { type: 'me', name: 'sa-ar'},
        { type: 'external', name: 'ww'},
        { type: 'external', name: 'ru'},
        { type: 'external', name: 'tr'},
        { type: 'external', name: 'in'},
        { type: 'external', name: 'kr'},
        { type: 'host', name: 'www-stage-view'},
        { type: 'host', name: 'www'},
        { type: 'sb', name: 'sourcebox'}
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
      <div className={styles.FilterContainer + ' ' + ((this.state.visible) ? styles.FilterContainerVisible : styles.FilterContainerHidden)}>
        <GeoSwitcher options={this.state.options} />
        <Version versions={this.state.versions} toggleForm={this.toggleForm} />
      </div>
    )
  }
}

export default FilterContainer;