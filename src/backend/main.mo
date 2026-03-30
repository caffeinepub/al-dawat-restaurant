actor {
  type RestaurantInfo = {
    name : Text;
    address : Text;
    phone : Text;
    hours : Text;
  };

  let restaurantInfo : RestaurantInfo = {
    name = "Al Dawat Restaurant";
    address = "123 Main St, Lahore, Pakistan";
    phone = "+92 123 4567890";
    hours = "Mon-Sun: 12pm - 11pm";
  };

  public query func getRestaurantInfo() : async RestaurantInfo {
    restaurantInfo;
  };
};
