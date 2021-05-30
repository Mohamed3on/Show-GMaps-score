const run = () => {
  const fiveStars = document
    .querySelectorAll('tr[role="image"]')[0]
    .ariaLabel.match(/(?<=stars,\s)(\d+),*(\d+)/g)?.[0];

  const fiveStarsAsNumber = Number(fiveStars.split(',').join(''));
  const oneStars = document
    .querySelectorAll('tr[role="image"]')[4]
    .ariaLabel.match(/(?<=stars,\s)(\d+),*(\d+)/g)?.[0];

  const oneStarsAsNumber = Number(oneStars.split(',').join(''));

  const score = fiveStarsAsNumber - oneStarsAsNumber;

  let allReviewsElement = document.querySelector('[jsan="7.gm2-caption"]');

  if (!allReviewsElement.innerHTML)
    allReviewsElement = document.querySelector('button[jsaction="pane.rating.moreReviews"]');

  const allReviews = allReviewsElement.innerText.match(/(\d+),*(\d+)/g)?.[0];

  const allReviewsAsNumber = Number(allReviews.split(',').join(''));

  const scorePercentage = Math.round((score / allReviewsAsNumber) * 100);

  allReviewsElement.innerHTML = `${score} good reviews, ${scorePercentage}%`;
};

const observer = new MutationObserver(function () {
  if (document.querySelector('tr[role="image"]')) {
    run();
    observer.disconnect(); // to stop observing the dom
  }
});

observer.observe(document.getElementById('pane'), {
  childList: true,
  subtree: true,
});
