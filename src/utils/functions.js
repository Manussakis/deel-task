// @TODO: It should highlight the term in the text regardless of
// whether the term is lowercase or uppercase.
// For now, the text was converted to lower case.
export const highlightText = (text, term) => {
  if (text && term) {
    return text.toLowerCase().replaceAll(term, `<span>${term}</span>`);
  }

  return '';
};
