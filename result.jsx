import { memo, useEffect, useMemo, useState } from "react";

const Result = ({ value, search, setSearch }) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    setSearch(false);
    if (value) {
      fetch(`https://api.nationalize.io?name=${value}`)
        .then((res) => res.json())
        .then((data) => setResult(data))
        .catch((err) => console.log(err));
    }
  }, [search]);
  const regionName = useMemo(() => {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return (countryId) => regionNames.of(countryId);
  }, [result]);
  return (
    <div>
      {result &&
        result?.country?.map((item) => {
          return (
            <div style={{ display: "flex" }}>
              <p>{regionName(item.country_id)}</p>
              <b>{item.probability * 100}%</b>
            </div>
          );
        })}
    </div>
  );
};

export default memo(Result);
