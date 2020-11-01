const customColors = {
    "black": "#000",
    "white": "#fff",
    "brown": "#ad8111",
    "beige": "#f0deba",
    "pink": "#fcc6de",
    "grey": "#ccc",
    "orange": "#F36B26",
    "green": "#7BBA3C",
    "red": "#E7352B",

    "blue": "#1e90ff",
    "cream": "#dfc99c",
    "mint": '#98ff98'
}

const getCustomColor = (color) => {
    if (!customColors[color]) {
        return color;
    }

    return customColors[color]
}

export {
    getCustomColor
}