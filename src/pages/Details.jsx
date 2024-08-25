// // export const Details = ({ match }) => {
// //   return <div>Details for {match.params.name}</div>; // Отображаем имя страны
// // };

// // import React from "react";
// // import { useParams } from "react-router-dom";

// // const Details = () => {
// //   const { name } = useParams();
// //   return <div>Details for {decodeURIComponent(name)}</div>;
// // };

// // export { Details };

// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { ALL_COUNTRIES } from "../config";

// // const Details = () => {
// //   const { name } = useParams();
// //   const [country, setCountry] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetch(ALL_COUNTRIES)
// //       .then((response) => response.json())
// //       .then((result) => {
// //         const foundCountry = result.find((c) => c.name === name);
// //         setCountry(foundCountry);
// //         setLoading(false);
// //       })
// //       .catch(() => setLoading(false));
// //   }, [name]);

// //   if (loading) return <p>Загрузка...</p>;

// //   if (!country) return <p>Страна не найдена</p>;

// //   return (
// //     <div>
// //       <h1>{country.name}</h1>
// //       <img src={country.flags.png} alt={`Флаг ${country.name}`} />
// //       {/* Добавьте больше информации о стране, если необходимо */}
// //     </div>
// //   );
// // };

// // export { Details };

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ALL_COUNTRIES } from "../config";
// import { Card } from "../components/Card";
// import axios from "axios";

// const Details = () => {
//   const { name } = useParams();
//   const [country, setCountry] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   axios(ALL_COUNTRIES)
//   //     .then((response) => response.json())
//   //     .then((result) => {
//   //       const foundCountry = result.find((c) => c.name === name);
//   //       setCountry(foundCountry);
//   //       setLoading(false);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Ошибка при загрузке данных:", error);
//   //       setLoading(false);
//   //     });
//   // }, [name]);

//   useEffect(() => {
//     axios
//       .get(ALL_COUNTRIES)
//       .then(({ data }) => setCountry(data))
//       .then((result) => {
//         const foundCountry = result.find((c) => c.name === name);
//         setCountry(foundCountry);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Ошибка при загрузке данных:", error);
//         setLoading(false);
//       });
//   }, [name]);

//   if (loading) return <p>Загрузка...</p>;

//   if (!country) return <p>Страна не найдена</p>;

//   // return (
//   //   <div>
//   //     <h1>{country.name}</h1>
//   //     <img src={country.flags.png} alt={`Флаг ${country.name}`} />
//   //     {/* Добавьте больше информации о стране, если необходимо */}
//   //   </div>
//   // );

//   // <div>
//   //   <h1>{country.name}</h1>
//   //   <img src={country.flags.png} alt={`Флаг ${country.name}`} />
//   //   <div>
//   //     <strong>Population: </strong>
//   //     {country.population.toLocaleString()}
//   //   </div>
//   //   <div>
//   //     <strong>Region: </strong>
//   //     {country.region}
//   //   </div>
//   //   <div>
//   //     <strong>Capital: </strong>
//   //     {country.capital}
//   //   </div>
//   // </div>;

//   return (
//     <>
//       {country.map((c) => {
//         const countryInfo = {
//           img: c.flags.png,
//           name: c.name,
//           info: [
//             {
//               title: "Population",
//               description: c.population.toLocaleString(),
//             },
//             {
//               title: "Region",
//               description: c.region,
//             },
//             {
//               title: "Capital",
//               description: c.capital,
//             },
//           ],
//         };

//         return (
//           /* <Link to={`/country/${c.name}`} key={c.name}>
//               <Card {...countryInfo} />
//             </Link>  */
//           <Card key={country.name} {...countryInfo} />
//         );
//       })}
//     </>
//   );
// };

// export { Details };

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchByCountry } from "../config";
import { Info } from "../components/Info";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { Button } from "../components/Button";

const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get(searchByCountry(name))
      .then(({ data }) => {
        setCountry(data[0]);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  if (loading) return <p>Загрузка...</p>;

  if (!country) return <p>Страна не найдена</p>;

  return (
    <>
      <Button onClick={handleBack}>
        <IoArrowBack />
        Back
      </Button>
      {country && <Info {...country} />}
    </>
  );
};

export { Details };
