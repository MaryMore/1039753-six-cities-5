import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header";
import OfferReviews from "../offer-reviews/offer-reviews";
import PlacesList from "../places-list/places-list";
import Map from "../map/map";
import {OfferType} from "../../const";
import {
  formatFloatingPointNumberToPercent
} from "../../utils.js";

const Room = (props) => {
  const {reviews, offers} = props;
  const {id, photo, title, description, premium, type, rating, price, bedroomsCount, guestsCount, stuff, owner} = offers[0];
  const {avatar, name, badge} = owner;
  const offersNear = offers.slice(0, 3);
  const coord = offersNear.map((offer) => offer.coord);
  const mapStyle = {
    display: `flex`,
    height: `100%`,
    width: 1144,
    margin: `0 auto`,
  };
  const currentClasses = {
    listClass: `near-places__list`,
    cardClass: `near-places__card`,
    imgClass: `near-places__image-wrapper`,
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {photo.map((img, i) => {
                return (
                  <div key={`${i}-img`} className="property__image-wrapper">
                    <img className="property__image" src={`/img/${img}`} alt="Photo studio" />
                  </div>);
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {premium ? <div className="property__mark"><span>Premium</span></div> : ``}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: formatFloatingPointNumberToPercent(rating) + `%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedroomsCount} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {guestsCount} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {stuff.map((stuffItem) => {
                    return (<li key={id} className="property__inside-item">
                      {stuffItem}
                    </li>);
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={badge ? `property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper` : `property__avatar-wrapper user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={`${avatar}`} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <OfferReviews reviews={reviews} />
            </div>
          </div>
          <section className="property__map map">
            <Map coord={coord} mapStyle={mapStyle} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList offers={offersNear} currentClasses={currentClasses} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Room;

Room.propTypes = {
  offers: PropTypes.array.isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    photo: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.ROOM, OfferType.HOUSE, OfferType.HOTEL]).isRequired,
    rating: PropTypes.number.isRequired,
    bedroomsCount: PropTypes.number.isRequired,
    guestsCount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    stuff: PropTypes.array.isRequired,
  }),
  reviews: PropTypes.array.isRequired
};

