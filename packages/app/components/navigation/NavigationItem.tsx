import { Text } from 'react-native';
import { useNavigationItem } from 'app/hooks/navigation';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import { Button } from 'tamagui';

export const NavigationItem = ({ item, itemStyle, isMobileView, onSelect }) => {
  const styles = useCustomStyles(loadStyles);
  const { currentTheme } = useTheme();
  const { IconComponent, isCurrentPage, handleItemPress } = useNavigationItem(
    item,
    onSelect,
  );
  const { icon, text } = item;
  return (
    <Button
      style={[
        styles.menuBarItem,
        isCurrentPage && styles.menuBarItemActive,
        !!itemStyle && itemStyle,
      ]}
      variant="outlined"
      onPress={handleItemPress}
      chromeless
      // activeOpacity={0.7}
    >
      <IconComponent
        name={icon}
        size={isMobileView ? 24 : 18}
        color={
          isCurrentPage
            ? currentTheme.colors.iconColor
            : currentTheme.colors.iconColor
        }
      />
      <Text
        style={[
          styles.menuBarItemText,
          isCurrentPage && styles.menuBarItemTextActive,
        ]}
      >
        {text}
      </Text>
    </Button>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    menuBarItem: {
      justifyContent: "left",
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 12,
    },
    menuBarItemText: {
      color: currentTheme.colors.text,
      fontSize: 18,
    },
    menuBarItemActive: {
      // Apply styles for the active item
      // ...
    },
    menuBarItemTextActive: {
      // Apply styles for the active item's text
      // ...
    },
    menuBarItemSelected: {
      // Apply styles for the selected item
      // ...
    },
  };
};
