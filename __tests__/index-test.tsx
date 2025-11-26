import { render } from '@testing-library/react-native';

import WelcomePage from '../src/index';

console.log('TYPE OF:', typeof WelcomePage);
console.log('EXPORT:', WelcomePage);

jest.mock('../src/assets/logo.svg', () => 'LogoMock'); // <- sin esto falla

describe('<WelcomePage />', () => {
  test('renders without crashing', () => {
    render(<WelcomePage />);
  });
});
