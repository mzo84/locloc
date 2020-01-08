import React from 'react';
import ReactDom from 'react-dom';
import HostToggle from './HostToggle';

test('Component does not crash', () => {
    const div = document.createElement("div");
    ReactDom.render(<HostToggle/>, div);
});