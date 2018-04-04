const getRealFilter = (filter) => {
    return Object.keys(filter).reduce((f, currentFilter) => {
        if (currentFilter === 'word') {
            if (filter[currentFilter] !== '') {
                f[currentFilter] = filter[currentFilter];
            }
        } else if (filter[currentFilter] !== 'all') {
            if (currentFilter === 'stroke') {
                let [min, max] = filter[currentFilter].split(',');
                if (!max) {
                    max = Infinity;
                }
                f[currentFilter] = [Number(min), Number(max)];
            } else {
                f[currentFilter] = filter[currentFilter];
            }
        }
        return f;
    }, {});
};

const getFilteredWords = (words, filter) => {
    const filterKeys = Object.keys(filter);
    return words.filter((wordItem) => {
        return filterKeys.every((key) => {
            if (key !== 'stroke') {
                return wordItem[key] === filter[key];
            } else {
                const stroke = Number(wordItem[key]);
                return stroke >= filter[key][0] && stroke <= filter[key][1];
            }
        });
    });
};

export default (words, filter) => {
    return new Promise((resolve) => {
        const realFilter = getRealFilter(filter);
        if (!Object.keys(realFilter).length) {
            resolve(words);
        }
        resolve(getFilteredWords(words, realFilter));
    });


}