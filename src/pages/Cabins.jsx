/** @format */

import { useEffect, useState } from 'react';
import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
// function Cabins() {
//   useEffect(function () {
//     console.log(getCabins());
//   }, []);
//   return (
//     <Row type="horizontal">
//       <Heading as="h1">All cabins</Heading>
//       <img src="https://jroqiytbtljjznebyltj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-05-26T19%3A15%3A03.293Z" />
//     </Row>
//   );
// }

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((show) => !show)}></Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
