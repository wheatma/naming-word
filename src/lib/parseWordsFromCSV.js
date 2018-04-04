export default (words) => {
    return words.slice(1).map((wordLine) => {
        const [
            word,
            pronounce,
            _0,
            stroke,
            _1,
            element,
            tone,
            meaning,
            fate
        ] = wordLine;
        return {
            key: word,
            word,
            pronounce,
            stroke,
            element,
            tone,
            meaning,
            fate
        };
    });
}