import './App.css';
import React, { useEffect, useState } from 'react';
import { PageLinkType } from './types/types';
import { Link} from 'react-router-dom';


const App = () => {
  const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
  const [paginationLink, setPaginationLink] = useState<PageLinkType>({ next: null, previous: null })
  const [dataUrl, setDataUrl] = useState('https://pokeapi.co/api/v2/pokemon')

  useEffect(() => {
    const fetchData = async () => {
      if (!dataUrl) return;

      try {
        const res = await fetch(dataUrl);
        const data = await res.json();
        setPokemonList(data.results);
        setPaginationLink({ next: data.next, previous: data.previous });
        window.scrollTo({behavior: 'smooth', top: 0})
      } catch (err) {
        console.log('err', err)
      }

    }
    fetchData();
  }, [dataUrl])


  return (


    <section>
      <div className='innerContainer' >
        <div className="pokemonContainer">
          {pokemonList.map((item,i) => {
            const link = item?.url.replace('https://pokeapi.co/api/v2/pokemon', '')

            return (
              <Link key={i} to={`${item.name}${link}`} className='pokemonCard' >
                <p>{item.name}</p>
              </Link>
            )
          })}
        </div>

        <div className='buttonContainer' >
          <button disabled={!paginationLink.previous} onClick={()=> setDataUrl(`${paginationLink.previous}`)} >previous</button>
          <button disabled={!paginationLink.next} onClick={()=> setDataUrl(`${paginationLink.next}`)} >Next</button>
        </div>
      </div>

    </section>
  );
}

export default App;
