import { authorizationString } from "../handlerFunc/passwordAPI";

const value = {
    action: "filter",
    params: { brand: "Bibigi" },
};

export const getFilterProduct = async () => {
    try {
        const res = await fetch("http://api.valantis.store:40000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth": authorizationString,
            },
            body: JSON.stringify(value),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const f = async (datas: any) => {
    const vas = {
        action: "get_items",
        params: {
            ids: datas,
        },
    };
    try {
        const res = await fetch("http://api.valantis.store:40000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth": authorizationString,
            },
            body: JSON.stringify(vas),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
