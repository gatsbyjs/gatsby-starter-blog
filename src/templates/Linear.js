import React from 'react';
import styled from '@emotion/styled';

export default function Linear({ children }) {
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
          .reduce((acc, child) => [...acc, <Separator />, child], [childList[0]])
      }
    </ChildrenWrapper>
  );
}