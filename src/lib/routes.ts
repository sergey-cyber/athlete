export const toHome = () => {
  return "/";
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

export const toProfile = () => {
  return "/profile";
};

// Merchandises

export const toMerchandises = () => {
  return "/merchandise";
};

export const toCreateMerchandise = () => {
  return toMerchandises() + "/create";
};

export const toMerchandise = (id: number) => {
  return toMerchandises() + `/${id}`;
};

export const toEditMerchandise = (id: number) => {
  return toMerchandise(id) + `/edit`;
};

// Amenities

export const toAmenitiesList = () => {
  return "/amenities";
};

export const toCreateAmenities = () => {
  return toAmenitiesList() + "/create";
};

export const toAmenities = (id: number) => {
  return toAmenitiesList() + `/${id}`;
};

export const toEditAmenities = (id: number) => {
  return toAmenities(id) + `/edit`;
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

// Users

export const toUsers = () => {
  return "/users";
};

export const toEditUser = (id: number) => {
  return toUsers() + `/${id}/edit`;
};

// files

export const toFiles = () => {
  return "/files";
};
