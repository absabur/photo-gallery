import { images } from "../../data";
import { CATEGORY, IMAGEID } from "../constance";

const initialState = {
  images: images,
  categoryImages: null,
  image: null,
};

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY:
      let images = null;
      for (let key in state.images) {
        if (key === action.payload) {
          images = state.images[key];
        }
      }
      return {
        ...state,
        categoryImages: images,
      };
    case IMAGEID:
      let cate = null;
      for (let key in state.images) {
        if (key === action.payload.category) {
          cate = key
          };
        }
      let image = null;
      state.images[cate].forEach((img) => {
        if (img.id === parseInt(action.payload.id)) {
          image = img;
        }
      })
      return {
        ...state,
        image: image,
      };
    default:
      return state;
  }
};
