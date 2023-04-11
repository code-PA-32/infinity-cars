import "./header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import {
  conditionFilter,
  onFilterReset,
  onPaginationChange,
  sellCarPosted,
  sellCarId,
  setLogged,
  currentUserLogged,
  fetchUsers,
} from "../../actions";
import { createSelector } from "reselect";
import { useHttp } from "../../hooks/http.hook";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import LoginIcon from "@mui/icons-material/Login";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";

const Header = () => {
  const filtersData = createSelector(
    (state) => state.filters,
    (state) => state.users,
    (filters, users) => {
      return {
        filters: filters,
        users,
      };
    }
  );

  const dispatch = useDispatch();
  const { request } = useHttp();
  const location = useLocation();
  const filteredData = useSelector(filtersData);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch(currentUserLogged(user));
      dispatch(setLogged(true));
      dispatch(fetchUsers(request));
    }
  }, [request, dispatch]);

  const onLogOutUser = () => {
    localStorage.removeItem("user");
    navigate("/");
    dispatch(onFilterReset());
    dispatch(setLogged(false));
    dispatch(currentUserLogged(null));
  };

  console.log();

  let messagesLength = 0;
  if (filteredData?.users?.login) {
    messagesLength = filteredData.users?.currentUser[0]?.messages.filter(
      (item) => item.open !== true
    ).length;
  }

  const style = {
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: "2",
  };

  return (
    <header style={location.pathname === "/" || "/compare" ? style : null}>
      <nav>
        <ul className="header-links">
          <li>
            <Link
              to="/"
              className="header-logo"
              onClick={() => {
                dispatch(onFilterReset());
                dispatch(sellCarPosted());
                dispatch(sellCarId(""));
                dispatch(fetchUsers(request));
              }}
            ></Link>
          </li>
          <li>
            <Link
              style={
                filteredData.filters.condition === true &&
                location.pathname === "/car_search_results"
                  ? { color: "#007cc7" }
                  : { color: "inherit" }
              }
              to="/car_search_results"
              onClick={() => {
                dispatch(onFilterReset());
                dispatch(onPaginationChange(10));
                dispatch(conditionFilter(true));
                dispatch(sellCarId(""));
              }}
            >
              New Cars
            </Link>
          </li>

          <li>
            <Link
              style={
                filteredData.filters.condition === false &&
                location.pathname === "/car_search_results"
                  ? { color: "#007cc7" }
                  : { color: "inherit" }
              }
              to="/car_search_results"
              onClick={() => {
                dispatch(onFilterReset());
                dispatch(onPaginationChange(10));
                dispatch(conditionFilter(false));
                dispatch(sellCarId(""));
              }}
            >
              Used Cars
            </Link>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? { color: "#007cc7" } : {})}
              to="/compare"
              onClick={() => {
                dispatch(sellCarId(""));
                dispatch(onFilterReset());
              }}
            >
              Compare
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sell"
              style={({ isActive }) => ({
                color: isActive ? "#007cc7" : "inherit",
              })}
              onClick={() => {
                dispatch(onFilterReset());
                return filteredData?.users?.login
                  ? dispatch(sellCarId(filteredData.users.currentUser[0].id))
                  : null;
              }}
            >
              Sell
            </NavLink>
          </li>
          <li>
            <ArticleSelect />
          </li>
        </ul>
      </nav>
      <ul className="active-header">
        <li>
          <button
            className="login-button"
            onClick={() => dispatch(onFilterReset())}
          >
            <Link
              to={filteredData.users.login ? "/admin" : "/login"}
              onClick={() => dispatch(onFilterReset())}
            >
              {filteredData.users.login ? (
                <>
                  <img
                    src={filteredData.users?.currentUser[0]?.photo}
                    alt="avatar"
                    height={20}
                    width={20}
                    style={{ borderRadius: "50%" }}
                  />
                  {filteredData.users?.currentUser[0]?.name}
                </>
              ) : (
                <>
                  <LoginIcon /> Sing In
                </>
              )}
            </Link>
          </button>
        </li>
        <li className="messages_icon">
          {filteredData.users.login ? (
            <Link to={"/admin"}>
              <Tooltip title="Messages" arrow>
                <Badge badgeContent={messagesLength} color="primary">
                  <MailIcon color="lightBlue" />
                </Badge>
              </Tooltip>
            </Link>
          ) : null}
        </li>
        <li>
          {filteredData.users.login ? (
            <Tooltip title="Logout" arrow>
              <button
                className="logout_button"
                onClick={() => {
                  onLogOutUser();
                }}
              >
                <LogoutIcon />
              </button>
            </Tooltip>
          ) : null}
        </li>
      </ul>
    </header>
  );
};

const ArticleSelect = () => {
  const [article, setArticle] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setArticle(event.target.value);
  };

  return (
    <FormControl
      sx={{
        m: 1,
        width: "max-content",
        border: "none",
        fontFamily: "inherit",
        fontWeight: "inherit",
        fontSize: "inherit",
      }}
      size="small"
    >
      <Select
        value={article}
        onChange={handleChange}
        displayEmpty
        sx={{
          border: "none",
          fontFamily: "inherit",
          fontWeight: "inherit",
          fontSize: "inherit",
        }}
        variant="standard"
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem
          value=""
          sx={{
            border: "none",
            fontFamily: "inherit",
            fontWeight: "inherit",
            fontSize: "inherit",
          }}
        >
          <em>Article</em>
        </MenuItem>
        <MenuItem value={"news"}>
          <button className="article_select">
            <Link to="/news">News</Link>
          </button>
        </MenuItem>
        <MenuItem value={"reviews"}>
          <button
            className="article_select"
            onClick={() => dispatch(onFilterReset())}
          >
            <Link to="/car_review">Car Review</Link>
          </button>
        </MenuItem>
        <MenuItem value={"faq"}>
          <button className="article_select">
            <Link to="/faq">FAQ</Link>
          </button>
        </MenuItem>
        <MenuItem value={"about"}>
          <button className="article_select">
            <Link to={"/about_us"}>About Us</Link>
          </button>
        </MenuItem>
        <MenuItem value={"contacts"}>
          <button className="article_select">
            <Link to={"/contacts"}>Contacts</Link>
          </button>
        </MenuItem>
        <MenuItem value={"customer service"}>
          <button className="article_select">
            <Link to={"/comment_about_us"}>Customer Service</Link>
          </button>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default Header;
