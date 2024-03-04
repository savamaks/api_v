import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../handlerFunc/passwordAPI";


const data = {
    action: "get_fields",
    params: { field: "brand",},
};
export const getBrend = createAsyncThunk("getBrend", async () => {

    const res = await fetch("https://api.valantis.store:41000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Auth": auth,
        },
        body: JSON.stringify(data),
    });
    if (res.status === 200) {
        const data = await res.json();
        return data;
    } else if (res.status === 500) {
        return { error: true };
    } else {
        console.log(res.status);
    }
});
