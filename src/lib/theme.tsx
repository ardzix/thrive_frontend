import { ThemeConfig } from "antd";

export const colors = {
  primaryColors: "#F2E2A8",
  mainColoLight: "#DAF0EE80",
  mainPurple: "#9c27b0",
  mainPurpleLight: "#deb7e5",
  greyLight: "#F2F2F2",
  grey: "#D9D9D9",
  black: "#000000",
  white: "#FFFFFF",
}

export const theme: ThemeConfig = {
  token: {
    // colorPrimary: colors.primaryColors,
    borderRadius: 5,
    colorText: colors.black,
    colorTextBase: colors.black,
    colorTextSecondary: colors.black,
    colorBorderBg: colors.black,
    
    // Alias Token
    // colorBgContainer: '#f6ffed',
  },
  components: {
    Button: {
      colorPrimary: colors.primaryColors,
      colorText: colors.black,
    },
    Input: {
      colorPrimary: colors.black,
      activeBorderColor: colors.grey,
      colorText: colors.black,
    },
    Spin: {
      colorPrimary: colors.black,
    },
  },
};
