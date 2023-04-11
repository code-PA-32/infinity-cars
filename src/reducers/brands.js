const initialState = {
  brand: null,
  model: null,
  condition: true,
  top: true,
  label: "",
  price: "",
  location: null,
  city: null,
  year: null,
  views: 0,
  engine: null,
  seats: "",
  color: null,
  body: null,
  logo: "https://drive.google.com/uc?id=12mbNI1__pRBJNuvvtAtdnXGf2ZC92TfO",
  transmission: null,
  rating: [],
  driveUnit: null,
  dealer: {
    dealerPhoto:
      "https://drive.google.com/uc?id=14Hcef7efE8WkgCX5u_z6Kg3DhZS7QJCr",
    name: "Alfredo Gouse",
    position: "Dealer",
    phone: "240-865-3730",
    email: "alfred.g@mail.com",
  },
  src: [],
  details: {
    "Car Details": {
      Brand: "",
      Model: "",
      Condition: true,
      Year: null,
      "Body Type": "",
      Seats: "",
      "Exterior Color": "",
    },
    Engine: {
      "Fuel Type": "",
      Mileage: "",
      Transmission: null,
      Drivetrain: "",
      Power: "",
      "Engine Capacity": "",
    },
    "Battery and Charging": {
      "Battery Capacity": "75 kWh",
      "Charge Port": "Type 2",
      "Charge Time (0->Full)": "330 min",
    },
    Dimension: {
      Length: "",
      Width: "",
      Height: "",
      "Cargo Volume": "",
    },
    Futures: {
      "Power Steering": false,
      AC: false,
      Alarm: false,
      Bluetooth: false,
      "Heated Seats": false,
      WiFi: false,
      "Cruise Control": false,
      "Front Parking Sensor": false,
      "Rear Parking Sensor": false,
      "Roof Rack": false,
      "Power Windows": false,
      Sunroof: false,
      "USB Port": false,
      "Sound System": false,
      "Memory Seat": false,
      "Camera 360": false,
    },
  },
  id: "",
  saleId: "",
  description: "",
  brandsLoadingStatus: "idle",
};

const brands = (state = initialState, action) => {
  switch (action.type) {
    case "SELL_BRAND_SELECTED":
      return {
        ...state,
        brand: action.payload,
        details: {
          ...state.details,
          "Car Details": {
            ...state.details["Car Details"],
            Brand: action.payload,
          },
        },
      };

    case "SELL_MODEL_SELECTED":
      return {
        ...state,
        model: action.payload,
        details: {
          ...state.details,
          "Car Details": {
            ...state.details["Car Details"],
            Model: action.payload,
          },
        },
      };

    case "SELL_BODY_SELECTED":
      return {
        ...state,
        body: action.payload,
        details: {
          ...state.details,
          "Car Details": {
            ...state.details["Car Details"],
            "Body Type": action.payload,
          },
        },
      };
    case "SELL_TITLE_SELECTED":
      return {
        ...state,
        label: action.payload,
      };

    case "SELL_YEAR_SELECTED":
      return {
        ...state,
        year: +action.payload,
        details: {
          ...state.details,
          "Car Details": {
            ...state.details["Car Details"],
            Year: action.payload,
          },
        },
      };

    case "SELL_PAX_SELECTED":
      return {
        ...state,
        seats: `${action.payload} people`,
        details: {
          ...state.details,
          "Car Details": {
            ...state.details["Car Details"],
            Seats: `${action.payload} people`,
          },
        },
      };
    case "SELL_COLOR_SELECTED":
      return {
        ...state,
        color: action.payload,
        details: {
          ...state.details,
          "Car Details": {
            ...state.details["Car Details"],
            "Exterior Color": action.payload,
          },
        },
      };
    case "SELL_CONDITION_SELECTED":
      return {
        ...state,
        condition: action.payload,
        details: {
          ...state.details,
          "Car Details": {
            ...state.details["Car Details"],
            Condition: action.payload === true ? "New" : "Used",
          },
        },
      };
    case "SELL_DESCRIPTION_SELECTED":
      return {
        ...state,
        description: action.payload,
      };
    case "SELL_FUEL_SELECTED":
      return {
        ...state,
        engine: action.payload,
        details: {
          ...state.details,
          Engine: {
            ...state.details.Engine,
            "Fuel Type": action.payload,
          },
        },
      };
    case "SELL_DRIVETRAIN_SELECTED":
      return {
        ...state,
        driveUnit: action.payload,
        details: {
          ...state.details,
          Engine: {
            ...state.details.Engine,
            Drivetrain: action.payload,
          },
        },
      };

    case "SELL_MILAGE_SELECTED":
      return {
        ...state,
        details: {
          ...state.details,
          Engine: {
            ...state.details.Engine,
            Mileage: `${action.payload} km`,
          },
        },
      };
    case "SELL_ENGINE_CAPACITY_SELECTED":
      return {
        ...state,
        details: {
          ...state.details,
          Engine: {
            ...state.details.Engine,
            "Engine Capacity": `${action.payload} cc`,
          },
        },
      };

    case "SELL_TRANSMISSION_SELECTED":
      return {
        ...state,
        transmission: action.payload,
        details: {
          ...state.details,
          Engine: {
            ...state.details.Engine,
            Transmission: action.payload,
          },
        },
      };
    case "SELL_ENGINE_POWER_SELECTED":
      return {
        ...state,
        details: {
          ...state.details,
          Engine: {
            ...state.details.Engine,
            Power: `${action.payload} hp`,
          },
        },
      };
    case "SELL_LENGTH_SELECTED":
      state.details.Dimension.Length = `${action.payload} mm`;

      return {
        ...state,
      };
    case "SELL_WIDTH_SELECTED":
      return {
        ...state,
        details: {
          ...state.details,
          Dimension: {
            ...state.details.Dimension,
            Width: `${action.payload} mm`,
          },
        },
      };
    case "SELL_HEIGHT_SELECTED":
      return {
        ...state,
        details: {
          ...state.details,
          Dimension: {
            ...state.details.Dimension,
            Height: `${action.payload} mm`,
          },
        },
      };
    case "SELL_CARGO_SELECTED":
      return {
        ...state,
        details: {
          ...state.details,
          Dimension: {
            ...state.details.Dimension,
            "Cargo Volume": `${action.payload} l`,
          },
        },
      };
    case "SELL_FUTURES_SELECTED":
      return {
        ...state,
        details: {
          ...state.details,
          Futures: action.payload,
        },
      };
    case "SELL_LOCATION_SELECTED":
      return {
        ...state,
        location: action.payload,
      };
    case "SELL_CITY_SELECTED":
      return {
        ...state,
        city: action.payload,
      };
    case "SELL_SET_PRICE_SELECTED":
      return {
        ...state,
        price: +action.payload,
      };
    case "SELL_IMAGES_SELECTED":
      return {
        ...state,
        src: action.payload,
      };
    case "SELL_ID_SELECTED":
      return {
        ...state,
        saleId: action.payload,
      };
    case "SELL_CAR_POSTED":
      return {
        ...initialState,
      };
    case "ON_CAR_EDIT":
      return {
        ...action.payload,
      };
    case "ON_SET_CAR_REVIEWS":
      return {
        ...state,
        ...(state = action.payload),
      };

    default:
      return state;
  }
};

export default brands;
