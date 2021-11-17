const colors = {
    mdb: {
        primary: "orange darken-4"
    },
    primary: "#A62F03",
    secondary: "#D97A07",
    dark: "#1C1C1C",
    darkLight: "#3E3E3E",
    background: "#151515",
    card: "#2A2A2A",
    cardLight: "#3E3E3E",
    button: "#992300",
    text: "#F6F6F6",
    mutedText: "#999999"
};

const classNames = {
    button: "fireside-button-dark"
};

const gradients = {
    primary: `linear-gradient(40deg, ${colors.secondary}, ${colors.primary})`,
    secondary: `linear-gradient(40deg, ${colors.primary}, ${colors.secondary})`
};

const darkTheme = {
    name: "dark",
    maskStrength: "strong",
    colors: colors,
    gradients: gradients,
    classNames: classNames
};

export default darkTheme;