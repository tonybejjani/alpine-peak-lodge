/** @format */

import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  // queryFn is responsible for fetching the data and it needs to return a promise.
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const discountValue = searchParams.get('discount') || 'all';

  // Filter
  let filteredCabins;
  if (discountValue === 'all') filteredCabins = cabins;

  if (discountValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (discountValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  console.log(filteredCabins);
  // Sort
  const sortValue = searchParams.get('sortBy') || 'startDate-desc';
  const [sortType, order] = sortValue.split('-');

  // sorting numbers
  const modifier = order === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[sortType] - b[sortType]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
