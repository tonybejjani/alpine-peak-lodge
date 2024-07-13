/** @format */

import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  // queryFn is responsible for fetching the data and it needs to return a promise.
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  const discountParamValue = searchParams.get('discount');

  let filteredCabins;
  if (discountParamValue === 'all') filteredCabins = cabins;

  if (discountParamValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (discountParamValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  console.log(filteredCabins);
  if (isLoading) return <Spinner />;

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
          data={filteredCabins}
          render={(filteredCabins) => (
            <CabinRow key={filteredCabins.id} cabin={filteredCabins} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
