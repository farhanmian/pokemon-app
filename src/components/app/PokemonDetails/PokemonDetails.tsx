import React, { useEffect, useState } from 'react'
import styles from './PokemonDetails.module.css'
import img from '../../../assets/img/pokemon-detail.jpg';
import { useParams } from 'react-router-dom'
import { PokemonDetailsType } from '../../../types/types';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

const PokemonDetails = () => {
    const { id, name } = useParams();

    const [details, setDetails] = useState<PokemonDetailsType>();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id && !name) return;

        const fetchData = async () => {

            try {
                const res = await fetch(`${baseUrl}/${id ? id : name}`);
                const data = await res.json();

                const ability: string[] = [];
                const types: string[] = [];

                data.abilities.map((item: { ability: { name: string } }) => ability.push(item.ability.name))
                data.types.map((item: { type: { name: string } }) => types.push(item.type.name))

                const transformData: PokemonDetailsType = {
                    name: (data.name as string).toLocaleLowerCase(),
                    abilities: ability,
                    height: data.height,
                    weight: data.weight,
                    types: types,
                    image: data.sprites.front_default,
                }
                setError(false);
                setDetails(transformData);

            } catch (err) {
                console.log('err', err)
                setError(true);
            }

        }
        fetchData();
    }, [id, name])
    console.log('details', details)

    return (
        <section className={styles.details} >
            <div className={styles.innerContainer} >
                <img src={img} alt='img' className={styles.image} />

                {!error && <div className='flexBetween' >
                    <div>
                        <p><b>Name :</b> {details?.name}</p>
                        <p><b>Type :</b> {details?.types.join(', ').toLocaleLowerCase()}</p>
                        <p><b>abilities :</b> {details?.abilities.join(', ').toLocaleLowerCase()}</p>
                        <p><b>weight :</b> {details?.weight}</p>
                        <p><b>height :</b> {details?.height}</p>
                    </div>
                    <img src={details?.image} alt='pokemon' />
                </div>}

                {error && <h2 className={styles.errorMessage} >Sorry, No Result Found!</h2>}

            </div>
        </section >
    )
}

export default PokemonDetails