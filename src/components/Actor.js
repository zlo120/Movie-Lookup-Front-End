import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Actor() {

    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    if (searchParams.get("id") !== null) {
        const id = searchParams.get("id");
        return (
            <>
                <h1>{id}</h1>
            </>
        )
    }

    return (
        <>
            <h1>Oops you might have gotten here by accident...</h1>
        </>
    );
}

export default Actor