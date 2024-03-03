// utility functions

const getInnerText = (id) => {
    const element = document.getElementById(id);
    return element.innerText;
};

const setInnerText = (text, id) => {
    document.getElementById(id).innerText = text;
};

// ----------------------------------------------------------------