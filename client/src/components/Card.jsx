import React, { Fragment } from 'react';

export default function Card({image, name, temperament, weight_min, weight_max}){
    return (
        <div>
            <img src = {image} alt = 'Imagen ot found' width = '200px' heigth = '250px' />
            <h3>{name}</h3>
            {
                temperament?.map(t => (
                    <h4>{t}</h4>
                ))
            }
            <h5>Minimum weight: {weight_min} - Maximum weight: {weight_max}</h5>
        </div>)
}