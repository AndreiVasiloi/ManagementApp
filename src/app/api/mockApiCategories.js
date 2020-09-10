import { delay } from "../common/util/util";
import { categoryData } from "./categoryOptions";

export function fetchCategoryOptions() {
    return delay(1000).then(function() {
        return Promise.resolve(categoryData)
    });
}