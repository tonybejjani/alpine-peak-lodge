/** @format */

import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options[0].value;
  if (searchParams.has('page')) {
    console.log(true);
  } else {
    console.log(false);
  }
  //set initial fitler field option to specified active filter on loading the page
  if (!currentFilter) {
    searchParams.set(filterField, currentFilter);
    setSearchParams(searchParams);
  }

  function handleUrlChange(value) {
    //remove page parameter when switching to another filter to avoid wronng page navigations
    if (searchParams.has('page')) {
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.label}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
          onClick={() => handleUrlChange(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
