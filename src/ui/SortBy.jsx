/** @format */

import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get('sortBy') || options.at(0).value;

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={currentSortBy}
    />
  );
}

export default SortBy;
