import React, { useMemo } from 'react';
import Page from '../../components/Page';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import SeatGeekBlue from '../../components/SeatGeekBlue';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { ThingInterface } from '../../types';
import Thing from '../../components/Thing';
import { ThingContainer } from './SeatGeekPage.styles';

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

export default function SeatGeekPage() {
  const { data, error, loading } = useQuery(GET_THIS_WEEK_SEATGEEK_THINGS);
  const things: ThingInterface[] = pluckThings(data);

  return (
    <Page>
      <Title>SeatGeek</Title>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Subtitle>
            {things.length > 0 ? (
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
            <ThingContainer data-class-name='thing-container'>
              {things.map(thing => (
                <Thing key={thing.id} thing={thing} />
              ))}
            </ThingContainer>
          )}
        </>
      )}
    </Page>
  );
}

function pluckThings(data: any): ThingInterface[] {
  const edges =
    data.seatGeekThingsThisWeek && data.seatGeekThingsThisWeek.edges;
  return edges ? edges.map((edge: any) => edge.thing) : [];
}
