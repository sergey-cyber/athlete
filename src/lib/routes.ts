export const toHome = () => {
  return "/";
};

export const toUsers = () => {
  return "/users";
};

export const toAbout = () => {
  return "/about";
};

// Merchandises

export const toMerchandises = () => {
  return "/merchandise";
};

export const toCreateMerchandise = () => {
  return toMerchandises() + "/create";
};

// Amenities

export const toAmenitiesList = () => {
  return "/amenities";
};

export const toCreateAmenities = () => {
  return toAmenitiesList() + "/create";
};

// Sopping cart

export const toShoppingCart = () => {
  return "/shopping-cart";
};
