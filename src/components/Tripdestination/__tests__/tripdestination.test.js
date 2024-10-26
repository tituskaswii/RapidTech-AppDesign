// tripdestination.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecentTrips from './tripdestination';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocking
fetchMock.enableMocks();

describe('RecentTrips Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('renders Latest Trips and Top 3 Destinations headers', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        trips: [
          {
            id: 1,
            pickup_location: 'Location A',
            dropoff_location: 'Destination A',
            request_date: '2024-10-20T10:00:00Z'
          },
          {
            id: 2,
            pickup_location: 'Location B',
            dropoff_location: 'Destination B',
            request_date: '2024-10-18T12:00:00Z'
          },
          {
            id: 3,
            pickup_location: 'Location C',
            dropoff_location: 'Destination C',
            request_date: '2024-10-17T14:00:00Z'
          },
          {
            id: 4,
            pickup_location: 'Location D',
            dropoff_location: 'Destination A',
            request_date: '2024-10-15T08:00:00Z'
          },
          {
            id: 5,
            pickup_location: 'Location E',
            dropoff_location: 'Destination B',
            request_date: '2024-10-14T09:30:00Z'
          },
          {
            id: 6,
            pickup_location: 'Location F',
            dropoff_location: 'Destination C',
            request_date: '2024-10-13T13:00:00Z'
          }
        ]
      })
    );

    render(<RecentTrips />);

    // Verify headers are rendered
    expect(screen.getByText(/Latest Trips/i)).toBeInTheDocument();
    expect(screen.getByText(/Top 3 Destinations/i)).toBeInTheDocument();

    // Wait for data to load and check recent trips list items
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(5);
    });

    // Check top destinations are rendered with correct percentages
    await waitFor(() => {
      expect(screen.getByText(/Destination A/i)).toBeInTheDocument();
      expect(screen.getByText(/Destination B/i)).toBeInTheDocument();
      expect(screen.getByText(/Destination C/i)).toBeInTheDocument();
    });
  });

  test('displays correct percentage and color in the progress bars for top destinations', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        trips: [
          {
            id: 1,
            pickup_location: 'Location A',
            dropoff_location: 'Destination A',
            request_date: '2024-10-20T10:00:00Z'
          },
          {
            id: 2,
            pickup_location: 'Location B',
            dropoff_location: 'Destination B',
            request_date: '2024-10-18T12:00:00Z'
          },
          {
            id: 3,
            pickup_location: 'Location C',
            dropoff_location: 'Destination C',
            request_date: '2024-10-17T14:00:00Z'
          },
          {
            id: 4,
            pickup_location: 'Location D',
            dropoff_location: 'Destination A',
            request_date: '2024-10-15T08:00:00Z'
          }
        ]
      })
    );

    render(<RecentTrips />);

    // Wait for top destinations to render
    await waitFor(() => {
      const destinationA = screen.getByText(/Destination A/i);
      const destinationB = screen.getByText(/Destination B/i);
      const destinationC = screen.getByText(/Destination C/i);

      expect(destinationA).toBeInTheDocument();
      expect(destinationB).toBeInTheDocument();
      expect(destinationC).toBeInTheDocument();
    });

    // Check for percentages and colors in progress bars
    await waitFor(() => {
      const progressBars = screen.getAllByRole('progressbar');
      expect(progressBars[0]).toHaveStyle(`background-color: #867AD2`);
      expect(progressBars[1]).toHaveStyle(`background-color: #FF7777`);
      expect(progressBars[2]).toHaveStyle(`background-color: #FFDAA3`);
    });
  });

  test('renders "See all" link that navigates to trips data URL', async () => {
    fetch.mockResponseOnce(JSON.stringify({ trips: [] }));

    render(<RecentTrips />);

    const seeAllLink = screen.getByText(/See all/i);
    expect(seeAllLink).toBeInTheDocument();
    expect(seeAllLink.closest('a')).toHaveAttribute('href', 'https://rapidtechinsights.github.io/hr-assignment/recent.json');
  });
});
