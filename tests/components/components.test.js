// const sum = require('../components/sum');

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/pages/index';

import Layout from '../../src/components/layout';
import SEO from '../../src/components/SEO';
import Sidebar from '../../src/components/navbar'

// TODO, Finish component rendering tests
// Components
describe('Tests Components Rendering', () => {
  it('renders Index without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  it('renders Layout without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Layout> </Layout>, div);
  });
  it('renders SEO without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SEO />, div);
  });
  it('renders Sidear without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sidebar />, div);
  });
})