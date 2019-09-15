const list = zvdata.countries.map(c => c.name);

const substringMatcher = (strs) => {
  return function findMatches(q, cb) {
    const matches = [];
    substrRegex = new RegExp(q, 'i');
    $.each(strs, function (i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};

$('.sign-up__form .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
}, {
  name: 'countries',
  source: substringMatcher(list)
});

const post = document.querySelector('.sign-up__form #zip')

const validateZip = () => {
  const country = document.querySelector('#kraina').value;
  if (country) {
    const code = (zvdata.countries.find(c => c.name === country))['alpha-2'];
    if (code) {
      const regexp = zvdata.regexp[code];
      if (regexp) {
        console.log('regexp', regexp);
        
        const r = new RegExp(regexp);
        if (r.test(post.value.toUpperCase()) || post.value === '') {
          post.setCustomValidity('');
        } else {
          post.setCustomValidity(`Not a valid ${code} zip code.`);
        }
      }
    } else {
      post.setCustomValidity('');
    }
  }
};

document.querySelector('#kraina').addEventListener('change', validateZip);

post.addEventListener('input', validateZip);