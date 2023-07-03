import * as constants from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import '../pages/index.css';

const openPopupImage = new PopupWithImage(constants.cardSettings.selectors.imagePopup);
const userInfo = new UserInfo({title: ".profile__title", subtitle: ".profile__subtitle"});
const section = new Section({constants, createCard}, constants.photosContainer);
const popupFormProfile = new PopupWithForm(constants.popupProfileName, userInfo.setUserInfo);
const popupFormCards = new PopupWithForm(constants.popupPhotoName, handleSubmitCards);

const popupFormList = Array.from(
  document.querySelectorAll(constants.validateSettings.selectors.popupFormClass)
);

popupFormList.forEach(function (popupForm) {
  checkValid(popupForm);
});

function createCard (cardName, cardLink) {
  const card = new Card(cardName, cardLink, constants.imageTemplate, constants.cardSettings, openPopupImage.openPopup, handleLikeCard, handleCardDelete);
  return card.createCard();
}

function checkValid(block) {
  const validator = new FormValidator(constants.validateSettings, block);
  constants.validationArr.push(validator);
  validator.enableValidation();
}

function handleSubmitCards ({photo_name, photo_link}) {
  section.addItem(createCard(photo_name, photo_link));
}

function handleLikeCard (card) {
  card.updateLikes();
}

function handleCardDelete (card) {
  card.deleteCard();
}

constants.profileEditButton.addEventListener("click", function () {
  popupFormProfile.openPopup();
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  constants.validationArr[0].clearValidation();
});

constants.photoAddButton.addEventListener("click", function () {
  popupFormCards.openPopup();
  constants.validationArr[1].clearValidation();
});

openPopupImage.setEventListeners();
popupFormProfile.setEventListeners();
popupFormCards.setEventListeners()
section.renderItems();