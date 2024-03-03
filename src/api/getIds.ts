import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizationString } from "../handlerFunc/passwordAPI";

export const getIds = createAsyncThunk("getId", async (value: any) => {
    const res = await fetch("http://api.valantis.store:40000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Auth": authorizationString,
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
