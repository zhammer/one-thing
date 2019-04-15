import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import Title from '../../components/Title';
import gql from 'graphql-tag';
import { ThingInterface } from '../../types';
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks';
import Subtitle from '../../components/Subtitle';
import Button from '../../components/Button';
import { Body, ThingTextArea, Danger } from './MePage.styles';
import Thing from '../../components/Thing';
import useFocusOnMount from '../../hooks/useFocusOnMount';
import { getRandomItem } from '../../util';
import SubtitlePlaceholder from '../../components/SubtitlePlaceholder';
import Confetti from '../../components/Confetti';

const MY_THING_THIS_WEEK = gql`
  query MyThingThisWeek {
    me {
      thingThisWeek {
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
`;

interface MyThingThisWeekQueryData {
  me: {
    thingThisWeek: ThingInterface | null;
  };
}

const THING_INPUT_FORM = gql`
  query ThingInputForm {
    thingInputForm @client
  }
`;

const SUBMIT_THING = gql`
  mutation SubmitThing($description: String!) {
    thingInputForm @client @export(as: "description")
    submitThing(description: $description) {
      success
    }
  }
`;

const COMPLETE_THING_THIS_WEEK = gql`
  mutation CompleteThingThisWeek {
    completeThingThisWeek {
      success
    }
  }
`;

export default function MePage() {
  const { data: myThingThisWeekQueryData, error, loading } = useQuery<MyThingThisWeekQueryData>(
    MY_THING_THIS_WEEK
  );
  const { data: thingInputFormQueryData } = useQuery<{
    thingInputForm: string;
  }>(THING_INPUT_FORM);
  const apolloClient = useApolloClient();
  const submitThing = useMutation(SUBMIT_THING);
  const completeThingThisWeek = useMutation(COMPLETE_THING_THIS_WEEK);
  const thingThisWeek = useMemo(() => pluckThingThisWeek(myThingThisWeekQueryData), [
    myThingThisWeekQueryData
  ]);
  const thingInput = useMemo(
    () => (thingInputFormQueryData ? thingInputFormQueryData.thingInputForm : ''),
    [thingInputFormQueryData]
  );
  const focusProps = useFocusOnMount();
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);

  function handleFormChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    apolloClient.writeQuery({
      query: THING_INPUT_FORM,
      data: { thingInputForm: event.target.value }
    });
  }
  function handleSubmitClicked() {
    submitThing({
      update: (cache, mutationResult) => {
        cache.writeQuery({
          query: THING_INPUT_FORM,
          data: { thingInputForm: '' }
        });
      },
      refetchQueries: ['MyThingThisWeek']
    });
  }
  function handleCompleteClicked() {
    completeThingThisWeek({
      refetchQueries: ['MyThingThisWeek'],
      update: () => {
        setSuccessfullySubmitted(true);
      }
    });
  }

  return (
    <Page>
      <Confetti partyTime={successfullySubmitted} />
      <Title>Me</Title>
      {loading ? (
        <SubtitlePlaceholder />
      ) : error ? (
        <Subtitle>
          <Danger>There was an error.</Danger>
        </Subtitle>
      ) : (
        <>
          <Subtitle>
            {thingThisWeek ? (
              <>Your One Thing for this week.</>
            ) : (
              <>What is one thing you want to do this week?</>
            )}
          </Subtitle>
          <Body>
            {thingThisWeek ? (
              <>
                <Thing thing={thingThisWeek} />
                {!thingThisWeek.complete && (
                  <Button.Primary onClick={handleCompleteClicked}>Complete</Button.Primary>
                )}
              </>
            ) : (
              <>
                <ThingTextArea
                  {...focusProps}
                  placeholder={placeholder}
                  onChange={handleFormChange}
                  value={thingInput}
                  data-class-name="thing-input-form"
                />
                <Button.Primary disabled={thingInput.length === 0} onClick={handleSubmitClicked}>
                  Submit
                </Button.Primary>
              </>
            )}
          </Body>
        </>
      )}
    </Page>
  );
}

const placeholderOptions = [
  'Increase GTV by 300%',
  'Fix the ice machine.',
  'Organize a salsa night for seatgeek-en-español',
  'Pick a date for the next womens ERG happy hour'
];
const placeholder = getRandomItem(placeholderOptions);

function pluckThingThisWeek(data: MyThingThisWeekQueryData | undefined): ThingInterface | null {
  if (!data || !data.me) {
    return null;
  }
  return data.me.thingThisWeek;
}
