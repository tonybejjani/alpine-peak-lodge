/** @format */
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: 'All', value: 'all' },
          { label: 'With discount', value: 'with-discount' },
          { label: 'No discount', value: 'no-discount' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'sort by name (A-Z)' },
          { value: 'name-desc', label: 'sort by name (Z-A)' },
          { value: 'regularPrice-asc', label: 'sort by price (lowest first)' },
          { value: 'regularPrice-desc', label: 'sort by price (higest first)' },
          {
            value: 'maxCapacity-asc',
            label: 'sort by capacity (lowest first)',
          },
          {
            value: 'maxCapacity-desc',
            label: 'sort by capacity (higest first)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
