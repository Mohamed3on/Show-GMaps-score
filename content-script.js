const addCommas = (x) => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const run = () => {
  let allReviewsElement = document.querySelector('[jsan="7.gm2-caption"]');

  if (!allReviewsElement.innerHTML)
    allReviewsElement = document.querySelector('button[jsaction="pane.rating.moreReviews"]');

  if (allReviewsElement.innerHTML.includes('score')) return;

  const fiveStars = document
    .querySelectorAll('tr[role="img"]')[0]
    .ariaLabel.match(/(?<=stars,\s)(\d*),*(\d*)/g)?.[0];

  const fiveStarsAsNumber = Number(fiveStars.split(',').join(''));
  const oneStars = document
    .querySelectorAll('tr[role="img"]')[4]
    .ariaLabel.match(/(?<=stars,\s)(\d*),*(\d*)/g)?.[0];

  const oneStarsAsNumber = Number(oneStars.split(',').join(''));

  const absoluteScore = fiveStarsAsNumber - oneStarsAsNumber;

  const allReviews = allReviewsElement.innerText.match(/(\d*),*(\d*)/g)?.[0];

  const allReviewsAsNumber = Number(allReviews.split(',').join(''));

  const ratio = absoluteScore / allReviewsAsNumber;

  const calculatedScore = Math.round(absoluteScore * ratio);

  allReviewsElement.innerHTML = `${addCommas(String(calculatedScore))} score (${Math.round(
    ratio * 100
  )}%)`;
};

let lastUrl = location.href;

let hasRun = false;

const observer = new MutationObserver(function () {
  const url = location.href;

  if (document.querySelector('tr[role="img"]'))
    if (url !== lastUrl || !hasRun) {
      lastUrl = url;
      hasRun = true;
      run();
    }
});

observer.observe(document.getElementById('pane'), {
  childList: true,
  subtree: true,
});
