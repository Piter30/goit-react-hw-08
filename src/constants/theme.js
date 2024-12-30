export const theme = {
  colors: {
    primary: '#1976d2',
    secondary: '#dc3545',
    background: '#f5f5f5',
    text: '#2a363b',
    white: '#ffffff',
    gray: '#cccccc',
  },
  spacing: value => `${4 * value}px`,
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  transition: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
};
