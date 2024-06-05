export const toHome = () => {
  return "/";
};

export const toUsers = () => {
  return "/users";
};

export const toAbout = () => {
  return "/about";
};

export const toSignIn = () => {
  return "/sign-in";
};

export const toSignUp = () => {
  return "/sign-up";
};

// Merchandises

export const toMerchandises = () => {
  return "/merchandise";
};

export const toCreateMerchandise = () => {
  return toMerchandises() + "/create";
};

export const toEditMerchandise = (id: number) => {
  return toMerchandises() + `/${id}/edit`;
};

// Amenities

export const toAmenitiesList = () => {
  return "/amenities";
};

export const toCreateAmenities = () => {
  return toAmenitiesList() + "/create";
};

export const toEditAmenities = (id: number) => {
  return toAmenitiesList() + `/${id}/edit`;
};

// Sopping cart

export const toShoppingCart = () => {
  return "/shopping-cart";
};

// Order

export const toOrders = () => {
  return "/order";
};

export const toEditOrder = (id: number) => {
  return toOrders() + `/${id}/edit`;
};

export const toCreateOrder = () => {
  return toOrders() + `/create`;
};

// Status

export const toStatuses = () => {
  return "/status";
};
