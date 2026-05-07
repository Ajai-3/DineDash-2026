import { useColorScheme } from '@mui/material/styles';
import { Button } from '@mui/material';

export function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  return (
    <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      Toggle to {mode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
}