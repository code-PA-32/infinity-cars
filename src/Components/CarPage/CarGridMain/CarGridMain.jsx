import "./carGridMain.scss";
import Spinner from "../../MainPage/Spinner/Spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RibbonFlag from "../RibbonFlag/RibbonFlag";
import CarRating from "../CarRating/CarRating";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import edit from "../../../assets/edit.png";
import { onCarEdit, sellCarId } from "../../../actions";
import useAddLikedCars from "../../../hooks/likedCar";
import useAddViews from "../../../hooks/addViews";
import empty from "../../../assets/empty-car.png";
import deleteImg from "../../../assets/delete.png";
import like from "../../../assets/like.png";
import like_fade from "../../../assets/like-fade.png";

const CarGridMain = (props) => {
  const {
    brand,
    model,
    condition,
    top,
    price,
    location,
    year,
    engine,
    seats,
    src,
    label,
    driveUnit,
    rating,
    id,
    canEdit,
    carDelete,
    to,
    user,
  } = props;

  const carsData = createSelector(
    (state) => state.cars.cars,
    (cars) => {
      return {
        cars,
        currentCar: cars.filter((car) => car.id === id)[0],
      };
    }
  );
  const dispatch = useDispatch();
  const { cars, currentCar } = useSelector(carsData);
  const { requestViews } = useAddViews();
  const [loading, setLoading] = useState(true)
  const { addLikedCar, deleteLikedCar } = useAddLikedCars();
  const navigate = useNavigate();
  const setCarToEdit = () => {
    return cars.filter((item) => item.id === id);
  };
  const carToEdit = setCarToEdit();

  const clazz = engine === "Electric" ? "electric" : "";
  const stars = rating.length !== 0 ? rating.map((item) => item.stared) : [];
  const spinner = loading ? <Spinner /> : null

  return (
    <li className="grid_card_main">
      {top ? <RibbonFlag label={label} /> : null}
      {user && user !== null ? (
        <button
          className={
            user.likedCars.some((item) => item === id) ? "like_btn" : "fade_btn"
          }
          onClick={() => {
            return user.likedCars.some((item) => item === id)
              ? deleteLikedCar(id, user)
              : addLikedCar(id, user);
          }}
        >
          <img
            src={user.likedCars.includes(id) ? like : like_fade}
            alt="like"
            height={20}
            width={20}
          />
        </button>
      ) : null}
      <div className="grid_card_main-image">
        {spinner}
        <img src={src[0] || empty} alt="grid layout"  onLoad={() => setLoading(false)}/>

        {canEdit ? (
          <button
            onClick={() => {
              dispatch(onCarEdit(carToEdit[0]));
              navigate("/sell");
            }}
            className="edit_button"
          >
            <img src={edit} alt="edit" />
            <span>Edit</span>
          </button>
        ) : null}
        {carDelete ? (
          <button className="delete_button" onClick={() => carDelete(id)}>
            <img src={deleteImg} alt="delete" />
            <span>Delete</span>
          </button>
        ) : null}
      </div>
      <div className="grid_card_main-info">
        <span className="grid_card_main-info-condition">
          {condition ? "New" : "Used"}
        </span>
        <h3 className="car-name-grid">
          {brand} {model}
        </h3>
        <span className="grid_card_main-info-price">
          {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $
        </span>
        <span className="grid_card_main-info-location">{location}</span>
        <div className="grid_card_main-info-block">
          <ul className="grid_card_main-info-block-list">
            <li className="year-grid">{year}</li>
            <li className="wheel-config-grid">{driveUnit}</li>
            <li className={`fuel-type-grid ${clazz}`}>{engine}</li>
            <li className="seats-grid">{seats}</li>
          </ul>
        </div>
        <div className="grid_card_main-info-rating">
          <CarRating rating={stars} size="small" />
          <span>({stars.length} Reviews)</span>
        </div>
        <Link
          to={to ? to : `/productdetail/${id}`}
          onClick={() => requestViews(id, currentCar)}
          className="active_link_car"
        ></Link>
        <Link
          to={`/car_review_details/${id}`}
          className="active_link_review"
          onClick={() => {
            dispatch(sellCarId(""));
          }}
        ></Link>
      </div>
    </li>
  );
};

export default CarGridMain;
