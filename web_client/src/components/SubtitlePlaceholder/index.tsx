import React from 'react';
import ContentLoader from 'react-content-loader';
import styled, { withTheme } from '../../custom/styled-components';
import { ThemeInterface } from '../../styles/theme';

const Container = styled.h2`
  display: flex;
  justify-content: center;
`;

function SubtitlePlaceholder({ theme }: { theme: ThemeInterface }) {
  return (
    <Container data-class-name="subtitle-placeholder">
      <ContentLoader
        speed={1.5}
        secondaryColor={theme.seatgeekBlueLight}
        primaryColor={theme.highlight}
        style={{
          fontSize: '1.25rem',
          height: '2em',
          width: '80%'
        }}
      >
        <rect x="0" y="20%" width="100%" height="100%" />
      </ContentLoader>
    </Container>
  );
}

export default withTheme(SubtitlePlaceholder);
