import {
  FontSizeTokens,
  Label,
  Paragraph,
  SizeTokens,
  styled,
  ThemeableStack,
  ThemeableStackProps,
  YStack,
} from 'tamagui';
import { LmFormContainerBaseTypes } from './formContainerTypes';

type LmFormContainerProps = ThemeableStackProps &
  LmFormContainerBaseTypes & {
    id?: string;
    size?: SizeTokens;
    fullWidth?: boolean;
  };

const StackContainer = styled(ThemeableStack, {
  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    labelInline: {
      true: {
        flexDirection: 'row',
        space: '$3',
        alignItems: 'center',
      },
    },
  } as const,
});

export function LmFormFieldContainer({
  label,
  children,
  helperText,
  id,
  size,
  labelProps,
  required,
  error,
  helperTextProps,
  ...rest
}: LmFormContainerProps) {
  return (
    <StackContainer {...rest} space={rest.labelInline ? '$3' : rest.space}>
      {label && (
        <Label
          htmlFor={id}
          size={size || '$3'}
          {...labelProps}
          color={error ? '$red10' : labelProps?.color}
          width={rest.labelInline ? 150 : labelProps?.width}
          justifyContent={
            rest.labelInline ? 'flex-end' : labelProps?.justifyContent
          }
        >
          {label} {required && ` *`}
        </Label>
      )}
      <YStack>
        {children}
        {helperText && (
          <Paragraph
            paddingLeft={'$2'}
            marginTop={'$2'}
            size={size as FontSizeTokens}
            {...helperTextProps}
            color={error ? '$red10' : undefined}
          >
            {helperText}
          </Paragraph>
        )}
      </YStack>
    </StackContainer>
  );
}
