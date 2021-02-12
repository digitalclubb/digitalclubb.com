import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';

import App from './App';

test('shows application renders properly', () => {
    const { getByText } = render(App);
  
    expect(getByText('Hello, world!')).toBeInTheDocument();
});