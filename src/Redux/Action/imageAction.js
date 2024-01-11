import { CATEGORY, IMAGEID } from "../constance"

export const getImages = (category) => {
    return {
        type: CATEGORY,
        payload: category
    }
}
export const getImage = (category, id) => {
    return {
        type: IMAGEID,
        payload: {
            category: category,
            id: id
        }
    }
}
