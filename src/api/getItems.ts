import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../handlerFunc/passwordAPI";


export const getItems = createAsyncThunk("getItems", async (value: any) => {
    const res = await fetch("https://api.valantis.store:41000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Auth": auth,
        },
        body: JSON.stringify(value),
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

