// linechart.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TripsLineChart from './linechart';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Mock server for handling API requests
const server = setupServer(
  rest.get('https://rapidtechinsights.github.io/hr-assignment/recent.json', (req, res, ctx) => {
    return res(
      ctx.json({
        trips: [
          { request_date: '2023-01-15', status: 'COMPLETED' },
          { request_date: '2023-02-10', status: 'COMPLETED' },
          { request_date: '2023-02-25', status: 'COMPLETED' },
          { request_date: '2023-03-05', status: 'CANCELLED' },
          { request_date: '2023-04-01', status: 'COMPLETED' }
        ]
      })
    );
  })
);

// Start the server before tests and close it after
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('TripsLineChart Component', () => {
  test('renders title and chart container', () => {
    render(<TripsLineChart />);
    
    const title = screen.getByText(/Trips Over Time/i);
    expect(title).toBeInTheDocument();

    const chartContainer = screen.getByRole('figure');
    expect(chartContainer).toBeInTheDocument();
  });

  test('fetches and displays monthly trip data', async () => {
    render(<TripsLineChart />);

    // Wait for the data to be processed and the chart to render
    await waitFor(() => {
      const janData = screen.getByText('Jan');
      const febData = screen.getByText('Feb');
      const aprData = screen.getByText('Apr');

      expect(janData).toBeInTheDocument();
      expect(febData).toBeInTheDocument();
      expect(aprData).toBeInTheDocument();
    });

    const tripsLine = screen.getByRole('img', { name: /trips/i });
    expect(tripsLine).toBeInTheDocument();
  });
});
