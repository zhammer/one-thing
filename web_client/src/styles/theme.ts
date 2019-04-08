import { lighten } from 'polished';

export interface ThemeInterface {
  primary: string;
  secondary: string;
  secondaryLight: string;
  background: string;
  highlight: string;
  seatgeekBlue: string;
  seatgeekBlueLight: string;
  danger: string;
}

const theme: ThemeInterface = {
  primary: '#2c2c34',
  secondary: '#3f3f46',
  secondaryLight: lighten(0.4, '#3f3f46'),
  background: '#fbfbfb',
  highlight: '#ebebec',
  seatgeekBlue: '#1673e6',
  seatgeekBlueLight: lighten(0.48, '#1673e6'),
  danger: '#f22b29'
};

export default theme;
