var difficulties = ['Easy', 'Medium', 'Hard']
export const getRandomInt = (min,max) => {
    return Math.floor(Math.random() * (max- min)) + min;
}

export const getNumberPrefix = data => data > 9 ? data : "0" + data;

export const getColorByDifficulty = (difficulty) => {
    var index = difficulties.indexOf(difficulty);
    switch(index) {
        case 0:
            return "green";
        case 1:
            return "yellow";
        case 2: 
            return "red";
        default:
            return "white";
    }
}

export const getFirstCapitalizedLetter = (text) => {
    if (typeof text !== 'string') {
        return "";
    }
    return text.charAt(0).toUpperCase();
}