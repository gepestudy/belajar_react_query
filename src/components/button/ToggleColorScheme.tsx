import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
export function ToggleColorScheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === "dark"
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {colorScheme === "dark" ? (
          <BsFillSunFill size={18} />
        ) : (
          <BsFillMoonFill size={18} />
        )}
      </ActionIcon>
    </Group>
  );
}
