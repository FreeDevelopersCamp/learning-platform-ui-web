import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function FilterList({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterBy = searchParams.get(filterField) || options.at(0).value;

  function handleChange(e) {
    searchParams.set(filterField, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={filterBy}
      onChange={handleChange}
    />
  );
}

export default FilterList;
