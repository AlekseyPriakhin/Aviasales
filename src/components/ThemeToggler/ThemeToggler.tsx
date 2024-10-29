import { useTheme } from '@/hooks/useTheme';
import { Button, Icon } from '@gravity-ui/uikit';
import { Moon, Sun } from '@gravity-ui/icons';

const ThemeToggler = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <Button onClick={() => switchTheme()}>
      <Icon
        data={theme === 'dark' ? Moon : Sun}
        size={18}
      />
    </Button>
  );
};

export default ThemeToggler;
