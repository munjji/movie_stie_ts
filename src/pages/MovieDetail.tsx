import React from "react";
import { useLocation } from "react-router-dom";
import useCreditsFetch from "../hooks/movies/useCreditsFetch";
import Credit from "../components/Credit";

interface LocationState {
  title?: string;
  date?: string;
  vote?: number;
  overview?: string;
  img?: string;
  defaultImg?: string;
}

const MovieDetail: React.FC<{ movieId: string }> = ({ movieId }) => {
  const { credits, isLoading } = useCreditsFetch(movieId);

  const location = useLocation();
  const {
    title,
    date,
    vote,
    overview,
    img = "",
    defaultImg = "",
  }: LocationState = location.state || {};
  const bgStyle = {
    backgroundImage: `url('${defaultImg}${img}')`,
  };

  if (isLoading) {
    return <div className="text-white">로딩 중입니다..</div>;
  }

  return (
    <div className="flex flex-col py-5">
      <div
        className={`flex flex-col justify-between h-[400px] gap-2 rounded-lg bg-cover bg-center text-white mb-5 p-5 overflow-auto`}
        style={bgStyle}
      >
        <div>
          <p className="text-2xl font-extrabold">{title}</p>
          <p>평균 {vote}</p>
          <p>{date}</p>
        </div>
        <p className="w-[400px] whitespace-pre-wrap">{overview}</p>
      </div>
      <div className="text-3xl font-extrabold">
        <p className="text-white">감독/출연</p>
        <div className="flex flex-row flex-wrap justify gap-14 p-4">
          {credits?.map((credit) => (
            <Credit
              img={credit.profile_path}
              name={credit.name}
              role={credit.character}
              key={credit.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
