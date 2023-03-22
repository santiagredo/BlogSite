import React from "react";
import { useNavigate } from 'react-router-dom';

export function Create_button () {
    const navigate = useNavigate();

    const create_redirect = () => {
        navigate('/create');
    };

    return (
        <button type="button" onClick={create_redirect}>Create</button>
    );
};