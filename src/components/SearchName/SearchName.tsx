import { ChangeEvent, MouseEvent, useState } from "react";
import s from "./SearchName.module.css";
import { changeDataRequest, changeSelectBrend } from "../../reducer/appSlice";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import { getIds } from "../../api/getIds";

const SearchName = () => {
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();
    const slicerProduct = useAppSelector((state) => state.slicerProduct);

    const changeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.target.value);
        dispatch(changeSelectBrend("All"));
    };

    const buttonSearch = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (value === "") return;
        setValue("");
        const data = {
            action: "filter",
            params: { product: value },
        };
        dispatch(getIds(data));
        dispatch(changeDataRequest(data));
    };
    return (
        <form className={s.form}>
            <label className={s.label}>Введите наименование:</label>
            <input
                className={s.input}
                disabled={slicerProduct.loading ? true : false}
                type="text"
                placeholder="Введите наименование..."
                value={value}
                onChange={changeSearchName}
            />
            <button disabled={slicerProduct.loading || value === "" ? true : false} onClick={buttonSearch}>
                Search
            </button>
        </form>
    );
};

export default SearchName;
