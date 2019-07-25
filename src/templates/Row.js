import React from 'react';
import styled from '@emotion/styled';

export default function Row({ children }) {
  const ChildrenWrapper = styled.div`
    display: flex;
  `;
  function Separator() {
    const StyledSmall = styled.small`
      margin-left: 0.25rem;
      margin-right: 0.25rem;
    `;

    return (
      <StyledSmall>/</StyledSmall>
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