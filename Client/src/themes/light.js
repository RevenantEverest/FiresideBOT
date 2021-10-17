const colors = {
    mdb: {
        primary: "orange darken-4"
    },
    primary: "#A62F03",
    secondary: "#D97A07",
    dark: "#1C1C1C",
    darkLight: "#3E3E3E",
    background: "#F6F6F6",
    card: "#F3F3F3",
    cardLight: "#FFFFFF",
    button: "#992300",
    text: "#000000",
    mutedText: "#666666"
};

const gradients = {
    primary: `linear-gradient(40deg, ${colors.secondary}, ${colors.primary})`,
    secondary: `linear-gradient(40deg, ${colors.primary}, ${colors.secondary})`
};

const lightTheme = {
    name: "light",
    colors: colors,
    gradients: gradients
};

export default lightTheme;