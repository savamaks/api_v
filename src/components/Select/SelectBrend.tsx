import { useEffect, ChangeEvent } from "react";
import s from "./SelectBrend.module.css";
import { getBrend } from "../../api/getBrend";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import { changeDataRequest, changeSelectBrend } from "../../reducer/appSlice";
import { getIds } from "../../api/getIds";

const SelectBrend = () => {
    const dispatch = useAppDispatch();
    const appSlicer = useAppSelector((state) => state.appSlicer);
    const slicerProduct = useAppSelector((state) => state.slicerProduct);

    const changeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        dispatch(changeSelectBrend(e.target.value));
        if (e.target.value !== "All") {
            const data = {
                action: "filter",
                params: { brand: e.target.value },
            };
            dispatch(getIds(data));
            dispatch(changeDataRequest(data));
        } else {
            const data = {
                action: "get_ids",
                params: { offset: 0 },
            };
            dispatch(getIds(data));
            dispatch(changeDataRequest(data));
        }
    };

    useEffect(() => {
        dispatch(getBrend());
    }, []);

    return (
        <form className={s.form}>
            <label className={s.label}>Brand:</label>
            <select value={appSlicer.selectBrend} disabled={slicerProduct.loading ? true : false} className={s.select} onChange={changeSelect}>
                <option className={s.option} value="All">
                    All
                </option>
                {appSlicer.filterBrend.length > 0 &&
                    appSlicer.filterBrend.map((el: string, index: number) => {
                        return (
                            <option className={s.option} key={index} value={el}>
                                {el}
                            </option>
                        );
                    })}
            </select>
        </form>
    );
};

export default SelectBrend;
