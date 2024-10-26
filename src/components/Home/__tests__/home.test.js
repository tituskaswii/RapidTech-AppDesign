// home.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './home';
import '@testing-library/jest-dom';
import Linechart from '../linechart/linechart';
import Tripdestination from '../Tripdestination/tripdestination';

// Mock the Linechart and Tripdestination components
jest.mock('../linechart/linechart', () => () => <div data-testid="linechart-component">Linechart Component</div>);
jest.mock('../Tripdestination/tripdestination', () => () => <div data-testid="tripdestination-component">Tripdestination Component</div>);

describe('Home Component', () => {
  test('renders Linechart and Tripdestination components', () => {
    render(<Home />);
    
    // Check if the Linechart component is rendered
    const linechart = screen.getByTestId('linechart-component');
    expect(linechart).toBeInTheDocument();
    expect(linechart).toHaveTextContent('Linechart Component');
    
    // Check if the Tripdestination component is rendered
    const tripdestination = screen.getByTestId('tripdestination-component');
    expect(tripdestination).toBeInTheDocument();
    expect(tripdestination).toHaveTextContent('Tripdestination Component');
  });
});
