import { ChangeEvent, MouseEvent, useState } from "react";
import s from "./SearchPrice.module.css";
import { changeDataRequest, changeSelectBrend } from "../../reducer/appSlice";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import { getIds } from "../../api/getIds";

const SearchPrice = () => {
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
        if (/[a-z\:\;'"`\.\?\,\!\(\)\*\$\%]/gi.test(value)) return;
        setValue("");

        const data = {
            action: "filter",
            params: { price: +value },
        };
        dispatch(getIds(data));
        dispatch(changeDataRequest(data));
    };
    return (
        <form className={s.form}>
            <label htmlFor="">Введите стоимость:</label>
            <input
                className={s.input}
                disabled={slicerProduct.loading ? true : false}
                type="number"
                placeholder="Введите стоимость..."
                value={value}
                onChange={changeSearchName}
            />
            <button disabled={slicerProduct.loading || value === "" ? true : false} onClick={buttonSearch}>
                Search
            </button>
        </form>
    );
};

export default SearchPrice;
