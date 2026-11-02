import { ThemeProvider } from './theme/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

// The main App component wraps everything. It is the only component that
// renders the ThemeProvider which must exist once at the top of the tree.
export function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
