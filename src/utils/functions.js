// @TODO: Convert debounce function to Typescript syntax.
// https://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// @TODO: It should highlight the term in the text regardless of
// whether the term is lowercase or uppercase.
// For now, the text was converted to lower case.
export const highlightText = (text, term) => {
  if (text && term) {
    return text.toLowerCase().replaceAll(term, `<span>${term}</span>`);
  }

  return '';
};
