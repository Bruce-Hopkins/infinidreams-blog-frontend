// const sum = require('../components/sum');

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../pages/index';

import Layout from '../components/layout';
import SEO from '../components/SEO';
import Sidebar from '../components/Sidebar'

// TODO, Add tests to confirm API connection
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