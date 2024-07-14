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

  const paramValue = searchParams.get('discount') || 'all';

  console.log(paramValue);

  // Filter
  let filteredData;
  if (paramValue === 'all') filteredData = cabins;

  if (paramValue === 'no-discount')
    filteredData = cabins.filter((cabin) => cabin.discount === 0);

  if (paramValue === 'with-discount')
    filteredData = cabins.filter((cabin) => cabin.discount > 0);

  // Sort

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
          data={filteredData}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
