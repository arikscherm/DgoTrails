import React from 'react';
import { render } from '@testing-library/react';
import Map from './Map';

test('renders map without crashing', () => {
  render(<Map />);
});

