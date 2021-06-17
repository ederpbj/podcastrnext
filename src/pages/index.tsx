import { GetStaticProps } from 'next';
import Image from 'next/image';
import { api } from '../services/api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import styles from './home.module.scss';

//Tipando
type Episode = {
  id: string;
	title: string;
	members: string;
	description: string;
	publishedAt: string;
	thumbnail: string;
	url: string;
	duration: number;
	durationAsString: string;
}

type HomeProps = {
  latesEpisodes: Episode[];
  allEpisodes: Episode[];
  //episodes: Episode[] //Array<Episode>
}


export default function Home({latesEpisodes, allEpisodes}: HomeProps) {
  return (
    // SSR
    <div className={styles.homePage}>
      <section className={styles.latesEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latesEpisodes.map((episode) => {
            return(
              <li key={episode.id}>
                <Image 
                  width="192" 
                  height="192" 
                  src={episode.thumbnail} 
                  alt={episode.title} 
                  objectFit="cover" 
                />
                
                <div className={styles.episodeDetails} >
                  <a href="" >{episode.title}</a>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button" >
                  <img src="/play-green.svg" alt="Tocar episódio"/>
                </button>
              </li>
            )
          })}
        </ul>
      </section>
      
      <section className={styles.allEpisodes}></section>
    </div>
  )
}

//SSR, Server Side Render ->  o next entende que tem que executar essa função antes de tudo
export const getStaticProps: GetStaticProps = async () => {
    const {data } = await api.get('episodes', {
      params: {
        _limit: 12,
        _sort: 'published_at',
        _order: 'desc'
      },
    });

    // Convertendo os dados que vem da api, percorrendo os episodeos 
    const episodes = data.map((episode) => {
      return {
        id: episode.id,
        title: episode.title,
        thumbnail: episode.thumbnail,
        members: episode.members,
        publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
        duration: Number(episode.file.duration),
        durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
        description: episode.description,
        url: episode.file.url,
      }
    });

    const latesEpisodes = episodes.slice(0, 2); //pega os dois últimos
    const allEpisodes = episodes.slice(2, episodes.length); //da posição 2 até o tamanho do array



    //Agora está tipado
    return {
      // Joga para função Home
      props: {
        latesEpisodes,
        allEpisodes,
      },
      revalidate: 60 * 60 * 8, //a cada 8 hs atualiza a página, nova chamada a api
    }
}
