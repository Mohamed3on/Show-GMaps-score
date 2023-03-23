const addCommas = (x) => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const run = (placeDetailsElement) => {
  const fiveStars = document
    .querySelectorAll('tr[role="img"]')[0]
    .ariaLabel.match(/(?<=stars,\s)(\d*),*(\d*)/g)?.[0];

  const fiveStarsAsNumber = Number(fiveStars.split(',').join(''));
  const oneStars = document
    .querySelectorAll('tr[role="img"]')[4]
    .ariaLabel.match(/(?<=stars,\s)(\d*),*(\d*)/g)?.[0];

  const oneStarsAsNumber = Number(oneStars.split(',').join(''));

  const score = fiveStarsAsNumber - oneStarsAsNumber;

  const allReviews = document
    .querySelector('button[jsaction="pane.reviewChart.moreReviews"]')
    .innerText.match(/\d*\.*,*\d*/g)?.[0];

  const allReviewsAsNumber = Number(allReviews.split(/[.,]/g).join(''));

  const ratio = score / allReviewsAsNumber;

  const calculatedScore = Math.round(score * ratio);

  const scorePercentage = Math.round(ratio * 100);

  const newElement = document.createElement('div');
  newElement.innerHTML = `score: ${addCommas(String(calculatedScore))} — ${scorePercentage}%`;
  placeDetailsElement.appendChild(newElement);
};

const observer = new MutationObserver(function () {
  const placeDetails = document.querySelector('.dmRWX');

  if (placeDetails && !placeDetails.innerHTML.includes('score')) {
    run(placeDetails);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
