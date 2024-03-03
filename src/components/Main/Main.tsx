import { useEffect } from "react";
import s from "./Main.module.css";
import { getIds } from "../../api/getIds";
import { getItems } from "../../api/getItems";
import { changeAmountPage, changeDataRequest } from "../../reducer/appSlice";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import Loader from "../Loader/Loader";
import Paginator from "../Paginator/Paginator";
import Filter from "../Filter/Filter";

const Main = () => {
    const dispatch = useAppDispatch();
    const appSlicer = useAppSelector((state) => state.appSlicer);
    const slicerProduct = useAppSelector((state) => state.slicerProduct);

    useEffect(() => {
        const data = {
            action: "get_ids",
            params: { offset: 0 },
        };
        dispatch(getIds(data));
        dispatch(changeDataRequest(data));
    }, []);

    useEffect(() => {
        if (appSlicer.ids.length > 0) {
            //всего сколько страниц будет
            const pages = Math.ceil(appSlicer.ids.length / 50);
            dispatch(changeAmountPage(pages));

            const data = {
                action: "get_items",
                params: { ids: appSlicer.ids.slice(0, 50) },
            };
            dispatch(getItems(data));
            dispatch(changeDataRequest(data));
        }
    }, [appSlicer.ids]);

    //если в ответе на запрос ID ПРОДУКТА приходит ответ 500, то запрос повторяется с последними данными
    useEffect(() => {
        if (appSlicer.error) {
            dispatch(getIds(appSlicer.dataRequest));
        }
    }, [appSlicer.error]);

    //если в ответе на запрос ДАННЫХ ПРОДУКТА приходит ответ 500, то запрос повторяется с последними данными
    useEffect(() => {
        if (slicerProduct.error) {
            dispatch(getItems(appSlicer.dataRequest));
        }
    }, [slicerProduct.error]);

    return (
        <section className={s.section}>
            <Filter />
            {appSlicer.ids.length > 50 && <Paginator />}
            {appSlicer.ids.length > 0 ? (
                <div className={s.box}>
                    <div className={s.card}>
                        <h2 className={s.text}>ID</h2>
                        <h2 className={s.text}>Name</h2>
                        <h2 className={s.text}>Price</h2>
                        <h2 className={s.text}>Brend</h2>
                    </div>
                    {slicerProduct.ids.length > 0 ? (
                        <>
                            {slicerProduct.ids.map((el: string, index: number) => {
                                return (
                                    <div className={!slicerProduct.loading ? s.card : s.cardLoader} key={index}>
                                        <p className={!slicerProduct.loading ? s.text : s.deactive}>{slicerProduct.entities[el].id}</p>
                                        <p className={!slicerProduct.loading ? s.text : s.deactive}>{slicerProduct.entities[el].product}</p>
                                        <p className={!slicerProduct.loading ? s.text : s.deactive}>{slicerProduct.entities[el].price} р.</p>
                                        <p className={!slicerProduct.loading ? s.text : s.deactive}>
                                            {slicerProduct.entities[el].brand !== null ? slicerProduct.entities[el].brand : "-"}
                                        </p>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>
            ) : (
                <>{appSlicer.ids.length > 0 || appSlicer.loading ? <Loader /> : <h3>Нет данных. Повторите запрос c другими параметрами..</h3>}</>
            )}
        </section>
    );
};

export default Main;
