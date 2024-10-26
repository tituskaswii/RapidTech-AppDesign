import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Trips from './trips';

// Mock fetch to simulate API response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ trips: [
      { id: 1, driver_name: 'John Doe', status: 'Completed', distance: 5, duration: 8, pickup_location: 'Central Park', dropoff_location: 'Times Square', cost: 20, cost_unit: '$', request_date: '2023-09-12', car_model: 'Toyota', car_make: 'Camry', car_year: 2021, car_number: 'ABC123', driver_pic: '/driver.jpg', car_pic: '/car.jpg' },
      { id: 2, driver_name: 'Jane Smith', status: 'Cancelled', distance: 10, duration: 15, pickup_location: 'Battery Park', dropoff_location: 'Wall Street', cost: 35, cost_unit: '$', request_date: '2023-09-13', car_model: 'Honda', car_make: 'Civic', car_year: 2019, car_number: 'XYZ456', driver_pic: '/driver2.jpg', car_pic: '/car2.jpg' }
    ]})
  })
);

describe('Trips Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders Trips component with data fetched from API', async () => {
    render(<Trips />);
    expect(fetch).toHaveBeenCalledTimes(1);
    
    await waitFor(() => expect(screen.getByText('Central Park')).toBeInTheDocument());
    expect(screen.getByText('Times Square')).toBeInTheDocument();
  });

  test('searches trips by keyword', async () => {
    render(<Trips />);
    await waitFor(() => expect(screen.getByText('Central Park')).toBeInTheDocument());

    // Type in the search input and trigger search
    fireEvent.change(screen.getByPlaceholderText('Search by distance, duration, keyword..'), { target: { value: 'Battery Park' } });
    fireEvent.click(screen.getByText('SEARCH'));
    
    await waitFor(() => {
      expect(screen.getByText('Battery Park')).toBeInTheDocument();
      expect(screen.queryByText('Central Park')).not.toBeInTheDocument();
    });
  });

  test('filters trips by distance', async () => {
    render(<Trips />);
    await waitFor(() => expect(screen.getByText('Central Park')).toBeInTheDocument());

    // Set distance filter and apply search
    fireEvent.click(screen.getByLabelText('3 to 6 km'));
    fireEvent.click(screen.getByText('SEARCH'));
    
    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
      expect(screen.queryByText('Battery Park')).not.toBeInTheDocument();
    });
  });

  test('filters trips by time', async () => {
    render(<Trips />);
    await waitFor(() => expect(screen.getByText('Central Park')).toBeInTheDocument());

    // Set time filter and apply search
    fireEvent.click(screen.getByLabelText('5 to 10 min'));
    fireEvent.click(screen.getByText('SEARCH'));

    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
      expect(screen.queryByText('Battery Park')).not.toBeInTheDocument();
    });
  });

  test('displays trip details when a trip is clicked', async () => {
    render(<Trips />);
    await waitFor(() => expect(screen.getByText('Central Park')).toBeInTheDocument());

    // Click on a trip card
    fireEvent.click(screen.getByText('2023-09-12'));

    await waitFor(() => {
      expect(screen.getByText('Driver Information')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Car Information')).toBeInTheDocument();
      expect(screen.getByText('Toyota')).toBeInTheDocument();
    });
  });

  test('removes filters when a filter tag is clicked', async () => {
    render(<Trips />);
    await waitFor(() => expect(screen.getByText('Central Park')).toBeInTheDocument());

    // Apply a filter and verify filter is displayed
    fireEvent.change(screen.getByPlaceholderText('Search by distance, duration, keyword..'), { target: { value: 'Central' } });
    fireEvent.click(screen.getByText('SEARCH'));
    await waitFor(() => expect(screen.getByText('Keyword: Central')).toBeInTheDocument());

    // Remove filter and verify results reset
    fireEvent.click(screen.getByText('x'));
    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
      expect(screen.getByText('Battery Park')).toBeInTheDocument();
    });
  });
});
