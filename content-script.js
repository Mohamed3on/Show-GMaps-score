const run = () => {
  let allReviewsElement = document.querySelector('[jsan="7.gm2-caption"]');

  if (!allReviewsElement.innerHTML)
    allReviewsElement = document.querySelector('button[jsaction="pane.rating.moreReviews"]');

  if (allReviewsElement.innerHTML.includes('good')) return;

  const fiveStars = document
    .querySelectorAll('tr[role="image"]')[0]
    .ariaLabel.match(/(?<=stars,\s)(\d*),*(\d*)/g)?.[0];

  const fiveStarsAsNumber = Number(fiveStars.split(',').join(''));
  const oneStars = document
    .querySelectorAll('tr[role="image"]')[4]
    .ariaLabel.match(/(?<=stars,\s)(\d*),*(\d*)/g)?.[0];

  const oneStarsAsNumber = Number(oneStars.split(',').join(''));

  const score = fiveStarsAsNumber - oneStarsAsNumber;

  const allReviews = allReviewsElement.innerText.match(/(\d*),*(\d*)/g)?.[0];

  const allReviewsAsNumber = Number(allReviews.split(',').join(''));

  const scorePercentage = Math.round((score / allReviewsAsNumber) * 100);

  allReviewsElement.innerHTML = `${score} good reviews, ${scorePercentage}%`;
};

let lastUrl = location.href;

let hasRun = false;

const observer = new MutationObserver(function () {
  const url = location.href;

  if (document.querySelector('tr[role="image"]'))
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
