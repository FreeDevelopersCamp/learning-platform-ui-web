import Filter from '../roadmaps/Filter';

function DashboardFilter({ onFilterChange }) {
  function handleFilterChange(value) {
    onFilterChange(value);
  }

  return (
    <Filter
      filterField="last"
      options={[
        { value: 'all', label: 'All' },
        { value: 'roadmaps', label: 'Roadmaps' },
        { value: 'courses', label: 'Courses' },
        { value: 'projects', label: 'Projects' },
        { value: 'practices', label: 'Practices' },
      ]}
      onFilterChange={handleFilterChange}
    />
  );
}

export default DashboardFilter;
