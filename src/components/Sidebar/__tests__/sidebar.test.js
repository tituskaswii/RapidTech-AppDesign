// sidebar.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './sidebar';
import '@testing-library/jest-dom';

describe('Sidebar Component', () => {
  const renderSidebar = () => {
    return render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
  };

  test('renders the TripFinder logo text', () => {
    renderSidebar();
    const logoText = screen.getByText(/TripFinder/i);
    expect(logoText).toBeInTheDocument();
  });

  test('renders navigation links with correct text', () => {
    renderSidebar();

    const homeLink = screen.getByText(/Home/i);
    const tripLink = screen.getByText(/Trip/i);
    const settingsLink = screen.getByText(/Settings/i);

    expect(homeLink).toBeInTheDocument();
    expect(tripLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });

  test('renders correct icons for each navigation item', () => {
    renderSidebar();

    const homeIcon = screen.getByTestId('fa-home-icon');
    const tripIcon = screen.getByTestId('gr-apps-icon');
    const settingsIcon = screen.getByTestId('fa-cog-icon');

    expect(homeIcon).toBeInTheDocument();
    expect(tripIcon).toBeInTheDocument();
    expect(settingsIcon).toBeInTheDocument();
  });

  test('renders a profile image with the correct alt text', () => {
    renderSidebar();
    const profileImage = screen.getByAltText(/Profile/i);
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/profile2.jpg');
  });

  test('renders navigation links with correct href attributes', () => {
    renderSidebar();

    const homeLink = screen.getByText(/Home/i).closest('a');
    const tripLink = screen.getByText(/Trip/i).closest('a');
    const settingsLink = screen.getByText(/Settings/i).closest('a');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(tripLink).toHaveAttribute('href', '/trips');
    expect(settingsLink).toHaveAttribute('href', '/settings');
  });
});
