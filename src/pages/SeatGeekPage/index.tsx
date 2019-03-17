import React, { useMemo } from 'react';
import Page from '../../components/Page';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import SeatGeekBlue from '../../components/SeatGeekBlue';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { ThingInterface } from '../../types';
import Thing from '../../components/Thing';
import { ThingsContainer, Danger } from './SeatGeekPage.styles';

const GET_THIS_WEEK_SEATGEEK_THINGS = gql`
  query SeatGeekThingsThisWeek {
    seatGeekThingsThisWeek {
      edges {
        thing: node {
          id
          person {
            firstName
            lastName
            email
          }
          description
          complete
          createdAt
        }
      }
    }
  }
`;

interface Data {
  seatGeekThingsThisWeek: {
    edges: [{ thing: ThingInterface }];
  };
}

export default function SeatGeekPage() {
  const { data, error, loading } = useQuery<Data>(
    GET_THIS_WEEK_SEATGEEK_THINGS
  );
  const things: ThingInterface[] = data ? pluckThings(data) : [];

  return (
    <Page>
      <Title>SeatGeek</Title>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Subtitle>
            {error ? (
              <Danger>There was an error.</Danger>
            ) : things.length > 0 ? (
              <>
                Here are the things people at{' '}
                <SeatGeekBlue>SeatGeek</SeatGeekBlue> want to do this week!
              </>
            ) : (
              <>
                Be the first person to submit your{' '}
                <SeatGeekBlue>One Thing</SeatGeekBlue> this week!
              </>
            )}
          </Subtitle>
          {things.length > 0 && (
            <ThingsContainer data-class-name="things-container">
              {things.map(thing => (
                <Thing key={thing.id} thing={thing} />
              ))}
            </ThingsContainer>
          )}
        </>
      )}
    </Page>
  );
}

function pluckThings(data: Data): ThingInterface[] {
  const edges =
    data.seatGeekThingsThisWeek && data.seatGeekThingsThisWeek.edges;
  return edges ? edges.map(edge => edge.thing) : [];
}
