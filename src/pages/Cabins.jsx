/** @format */

import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';
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
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
