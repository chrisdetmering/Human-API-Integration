import React, { useState, useEffect } from "react";
import axios from 'axios';
import NavBar from "./NavBar";


const WellnessAPI = () => {


    const getAllergies = () => {
        axios(`/api/wellness`)
            .then(res => console.log(res))
    }

    return (
        <div>
            <NavBar />
            <button onClick={getAllergies}>Get Allergies</button>
        </div>
    );
}

export default WellnessAPI;