import React from 'react';
import styled from '@emotion/styled';

export default function Row({ children }) {
  const ChildrenWrapper = styled.div`
    display: flex;
  `;
  function Separator() {
    return (
      <small>/</small>
    );
  }
  const childList = React.Children.toArray(children);

  return (
    <ChildrenWrapper>
      {
        childList
          .slice(1)
          .reduce((acc, child, i) => [...acc, <Separator key={i} />, child], [childList[0]])
      }
    </ChildrenWrapper>
  );
}