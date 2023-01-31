import MarkerItem from './MarkerItem';

function MarkerList ({list}) {
  return (
    list.map((item) =>
      <MarkerItem key={ item.renderId } data={ item }/>
    )
  );
}

export default MarkerList;
