import s from "./Filter.module.css";

import SelectBrend from "../Select/SelectBrend";
import SearchName from "../SearchName/SearchName";
import SearchPrice from "../SearchPrice/SearchPrice";

const Filter = () => {
    return (
        <div >
            <div className={s.container}>
                <SelectBrend />
                <SearchName />
                <SearchPrice />
            </div>
        </div>
    );
};

export default Filter;
