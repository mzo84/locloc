import React from 'react';
import ReactDom from 'react-dom';
import GeoSwitcher from './GeoSwitcher';

test('Expect GeoSwitcher to render without crashing.', () => {

    const options = [
        { type: 'me', name: 'ae'},
        { type: 'external', name: 'ww'},
        { type: 'host', name: 'www'},
        { type: 'sb', name: 'sourcebox'}
      ];

    const div = document.createElement("div");
    ReactDom.render(<GeoSwitcher options={options} />, div);

});