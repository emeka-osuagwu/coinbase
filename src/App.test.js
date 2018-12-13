import React from 'react';
import ReactDOM from 'react-dom';
import axiosMock from 'axios'
import {render, fireEvent, cleanup, waitForElement, renderIntoDocument} from 'react-testing-library'
import 'jest-dom/extend-expect'

import App from './components/App';

afterEach(cleanup)

beforeEach(function () {

	global.axios = jest.fn(() => Promise.resolve({ data: {} }))

});


it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('check loading element is starting up', () => {
	const {getByText, getByTestId, container, asFragment} = render(<App />,)
	 expect(axios).toHaveBeenCalledTimes(0);
	asFragment(container, loader_con)
});


