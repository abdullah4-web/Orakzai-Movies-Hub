import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/CustomPagination";
import Genres from "../../components/Genres";
import SingleContent from "../../components/SingleContent";
import useGenres from "../../hooks/useGenres";

const Series = () => {
	const [page, setPage] = useState(1);
	const [content, setContent] = useState([]);
	const [numOfPages, setNumOfPages] = useState();
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [genres, setGenres] = useState([]);

	const genreforURL = useGenres(selectedGenres);

	const fetchMovies = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/tv?api_key=e2211c12467b6a57e0ecc1fdffcdfaa9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforURL}`
		);

		setContent(data.results);
		setNumOfPages(data.total_pages);
	};

	useEffect(() => {
		fetchMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, genreforURL]);

	return (
		<div>
			<span className='uppercase flex justify-center p-1 text-white font-extralight text-[1.1rem] md:text-[1.5rem] lg:text-[1.8rem] mb-4'>
				Discover TV Series
			</span>
			<Genres
				type='tv'
				selectedGenres={selectedGenres}
				setSelectedGenres={setSelectedGenres}
				genres={genres}
				setGenres={setGenres}
				setPage={setPage}
			/>
			<div className='flex flex-wrap justify-center gap-4'>
				{content &&
					content.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type='tv'
							vote_average={c.vote_average}
						/>
					))}
			</div>
			{numOfPages > 1 && (
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			)}
		</div>
	);
};

export default Series;
