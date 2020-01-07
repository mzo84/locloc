import React from 'react';
import ReactDom from 'react-dom';
import FilterContainer from './components/FilterContainer';

it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<FilterContainer/>, div);
})