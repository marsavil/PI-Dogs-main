import React, { Fragment } from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogs } from '../actions';
import Card from './Card';

export default function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const temperaments = useSelector((state) => state.temperaments )

    useEffect(() => {
        dispatch(getDogs()); 
    },[dispatch])

    function handleClick(event){
        event.preventDefault();
        dispatch(getDogs())
    };

    return(
        <div>
            <Link to = '/dog'>Add Dog</Link>
            <h1>The Definite Dogs App</h1>
            <button onClick={e=>{handleClick(e)}}>
                Restore Dogs List
            </button>
            <div>
                <select >
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select >
                    <option value="asc">Min/Weight-Max/Weight</option>
                    <option value="desc">Max/Weight-Min/Weight</option>
                </select>
                <select >
                    <option value="all">All</option>
                    {temperaments?.map(t =>( 
                        <option value={t.name} key={t.id}>{t.name}</option>))}
                </select>
                <select >
                    <option value="All">All Dogs</option>
                    <option value="api">Our Dogs</option>
                    <option value="created">Visitors' Dogs</option>
                </select>
                {
                    allDogs?.map(
                        d => {
                            return(
                                <Fragment>
                                    <Link to={'/home/'+ d.id}>
                                    <Card image = {d.image} name = {d.name} temperament = {d.temperament} weight_min = {d.weight_min} weight_max = {d.weight_max} />
                                    </Link>
                                </Fragment>

                            )

                        }
                    )
                }
                
            </div>
        </div>
        )
}