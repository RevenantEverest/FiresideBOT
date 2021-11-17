const colors = {
    mdb: {
        primary: "orange darken-4"
    },
    primary: "#A62F03",
    secondary: "#D97A07",
    dark: "#1C1C1C",
    darkLight: "#3E3E3E",
    background: "#F6F6F6",
    card: "#F1F1F1",
    cardLight: "#FFFFFF",
    button: "#992300",
    text: "#000000",
    mutedText: "#333333"
};

const classNames = {
    button: "fireside-button-dark"
};

const gradients = {
    primary: `linear-gradient(40deg, ${colors.secondary}, ${colors.primary})`,
    secondary: `linear-gradient(40deg, ${colors.primary}, ${colors.secondary})`
};

const lightTheme = {
    name: "light",
    maskStrength: "light",
    colors: colors,
    gradients: gradients,
    classNames: classNames
};

export default lightTheme;