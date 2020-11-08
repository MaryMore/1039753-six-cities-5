import React from "react";
import PropTypes from "prop-types";
import OfferReview from "../offer-review/offer-review";
import withReview from "../../hocs/with-review/with-review";
import ReviewsForm from "../reviews-form/reviews-form";

const ReviewsFormWrapped = withReview(ReviewsForm);

const OfferReviews = (props) => {

  const {reviews} = props;
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <OfferReview key={review.id} review={review} />
        ))}
      </ul>
      <ReviewsFormWrapped />
    </section>
  );
};

export default OfferReviews;

OfferReviews.propTypes = {
  reviews: PropTypes.array.isRequired
};
