import { render } from '@testing-library/react-native';

import WelcomePage from '@/src/app';

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<WelcomePage />);

    getByText('Welcome!');
  });
});
