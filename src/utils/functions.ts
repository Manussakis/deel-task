export const highlightText = (text: string, term: string): string => {
  if (text && term) {
    const textArr = text.split(' ');
    const textLowArr = text.toLowerCase().split(' ');
    const termLower = term.toLowerCase();

    textLowArr.forEach((word, index) => {
      if (word.indexOf(termLower) > -1) {
        const start = word.indexOf(termLower);
        const end = termLower.length + start;

        textArr[index] = `${word.substring(0, start)}<span>${textArr[index].slice(start, end)}</span>${word.substring(end)}`;
      }
    });

    return textArr.join(' ');
  }

  return text || '';
};
