import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import { Spinner } from "./Spinner";
import { Route, useNavigate, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isinfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isCardsLoading, setIsCardsLoading] = useState(true);
  const [isEditProfileChanging, setIsEditProfileChanging] = useState(false);
  const [isAddPlaceChanging, setIsAddPlaceChanging] = useState(false);
  const [isEditAvatarChanging, setIsEditAvatarChanging] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    loggedIn &&
      Promise.all([api.getInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsCardsLoading(false);
        });
  }, [loggedIn]);



  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUser = (data) => {
    setIsEditProfileChanging(true);
    api
      .addInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsEditProfileChanging(false);
      });
  };

  const handleUpdateAvatar = (data) => {
    setIsEditAvatarChanging(true);
    api
      .addAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsEditAvatarChanging(false);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    setIsAddPlaceChanging(true);
    api
      .createCard(data)
      .then((newData) => {
        setCards([newData, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsAddPlaceChanging(false);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((i) => (i._id === card._id ? newCard : i))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  };

  // const authentication = useCallback((data) => {
  //   if (!data) {
  //     throw new Error("Ошибка аутентификации");
  //   }
  //   if (data.jwt) {
  //     localStorage.setItem("jwt", data.jwt);
  //     setLoggedIn(true);
  //     setEmail(data.email);
  //   }
  // }, []);

  const handleLogin = useCallback(
    async (info) => {
      setIsCardsLoading(true);
      try {
        const data = await auth.authorize(info);
        if (data.jwt) {
          //authentication(data);
          localStorage.setItem("jwt", data.jwt);
          setLoggedIn(true);
          setEmail(info.email);
          navigate("/", { replace: true });
        }
      } catch (e) {
        console.error(e);
        setInfoTooltipStatus(true);
        setIsInfoTooltipOpen(true);
      } finally {
        setIsCardsLoading(false);
      }
    },
    [navigate]
  );

  const handleRegistration = useCallback(
    async (info) => {
      setIsCardsLoading(true);
      try {
        const data = await auth.register(info);
        if (data) {
          //authentication(data);
          setIsInfoTooltipOpen(true);
          setInfoTooltipStatus(false);
          navigate("/sign-in", { replace: true });
        }
      } catch (e) {
        console.error(e);
        setInfoTooltipStatus(true);
        setIsInfoTooltipOpen(true);
      } finally {
        setIsCardsLoading(false);
      }
    },
    [navigate]
  );

  const handleTokenCheck = useCallback(async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      try {
        const user = await auth.checkToken(jwt);
        if (!user) {
          throw new Error("Данные отсутствуют");
        }
        setLoggedIn(true);
        setEmail(user.data.email);
        navigate("/");
      } catch (e) {
        console.error(e);
      } finally {
        setIsCardsLoading(false);
      }
    } else {
      setIsCardsLoading(false);
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setLoggedIn(false);
    setEmail("");
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }, [navigate]);

 

  useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header email={email} onExit={handleLogout} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                loggedIn={loggedIn}
                  element={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  handleRegister={handleRegistration}
                />
              }
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} setInfoTooltipStatus={setInfoTooltipStatus} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onChanging={isEditProfileChanging}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onChanging={isAddPlaceChanging}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onChanging={isEditAvatarChanging}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />
          <Spinner isLoading={isCardsLoading} />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isinfoTooltipOpen}
            iStatus={infoTooltipStatus}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
