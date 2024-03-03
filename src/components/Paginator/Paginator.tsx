import { MouseEvent, ReactElement } from "react";
import s from "./Paginator.module.css";
import { getItems } from "../../api/getItems";
import { changeDataRequest, changePage } from "../../reducer/appSlice";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import { removeAll } from "../../reducer/slicerProduct";

const Paginator = () => {
    const dispatch = useAppDispatch();
    const appSlicer = useAppSelector((state) => state.appSlicer);
    const slicerProduct = useAppSelector((state) => state.slicerProduct);

    const getButton = () => {
        let buttonArr: Array<ReactElement> = [];

        for (let index = 0; index < appSlicer.amountPage; index++) {
            if (
                (index + 2 >= appSlicer.page && index + 2 <= appSlicer.page + appSlicer.paginator) ||
                (index + appSlicer.paginator >= Math.ceil(appSlicer.ids.length / 50) &&
                    appSlicer.page + appSlicer.paginator > Math.ceil(appSlicer.ids.length / 50))
            ) {
                buttonArr.push(
                    <button
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            const startPage = index * 50;
                            const data = {
                                action: "get_items",
                                params: { ids: appSlicer.ids.slice(startPage, startPage + 50) },
                            };

                            dispatch(removeAll());
                            dispatch(changePage(index + 1));
                            dispatch(getItems(data));
                            dispatch(changeDataRequest(data));
                        }}
                        key={index}
                        disabled={index + 1 === appSlicer.page || slicerProduct.loading ? true : false}
                        className={`${index + 1 === appSlicer.page ? s.active : ""}`}
                    >
                        {index + 1}
                    </button>
                );
            }
        }
        return buttonArr;
    };
    return (
        <div className={s.block}>
            {appSlicer.page > 2 && appSlicer.amountPage > appSlicer.paginator && (
                <button
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();

                        const data = {
                            action: "get_items",
                            params: { ids: appSlicer.ids.slice(0, 50) },
                        };
                        dispatch(removeAll());
                        dispatch(changePage(1));
                        dispatch(getItems(data));
                        dispatch(changeDataRequest(data));
                    }}
                    disabled={slicerProduct.loading ? true : false}
                >
                    1
                </button>
            )}
            {appSlicer.page > 3 && "..."}
            {getButton()}
            {appSlicer.page < Math.ceil(appSlicer.ids.length / 50) - appSlicer.paginator && "..."}

            {appSlicer.page - 1 < Math.ceil(appSlicer.ids.length / 50) - appSlicer.paginator && (
                <button
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();

                        const data = {
                            action: "get_items",
                            params: { ids: appSlicer.ids.slice(appSlicer.ids.length - 50) },
                        };
                        dispatch(removeAll());
                        dispatch(changePage(Math.ceil(appSlicer.ids.length / 50)));
                        dispatch(getItems(data));
                        dispatch(changeDataRequest(data));
                    }}
                    disabled={slicerProduct.loading ? true : false}
                >
                    {Math.ceil(appSlicer.ids.length / 50)}
                </button>
            )}
        </div>
    );
};

export default Paginator;
