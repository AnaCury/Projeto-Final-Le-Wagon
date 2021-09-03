import consumer from "./consumer";

const initReviewsCable = () => {
  const reviewsContainer = document.getElementById('reviews-container');
  if (reviewsContainer) {
    const id = reviewsContainer.dataset.reportId;
    console.log(id);

    consumer.subscriptions.create({ channel: "ReviewsChannel", id: id }, {
      received(data) {
        const noReviewsContainer = document.getElementById('no-reviews-container');
        console.log(noReviewsContainer);
        if (noReviewsContainer) { noReviewsContainer.remove() };
        reviewsContainer.insertAdjacentHTML('beforeend', data.partial);
        if (data.review_count == 1) {
          const reviewsCounter = `<strong>Total reviews: <span id="review-count"> ${data.review_count}</span></strong>`
          reviewsContainer.insertAdjacentHTML('afterend', reviewsCounter);
        } else {
          const reviewCount = document.getElementById('review-count');
          reviewCount.innerText = data.review_count
        }
      },
    });
  }
}

export { initReviewsCable };
