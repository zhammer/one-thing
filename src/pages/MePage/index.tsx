import React, { useMemo } from 'react';
import Page from '../../components/Page';
import Title from '../../components/Title';
import gql from 'graphql-tag';
import { ThingInterface } from '../../types';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Subtitle from '../../components/Subtitle';
import Button from '../../components/Button';
import { Body } from './MePage.styles';
import Thing from '../../components/Thing';

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

const SET_THING_INPUT_FORM = gql`
  mutation SetThingInputForm($text: String!) {
    setThingInputForm(text: $text) @client {
      success
    }
  }
`;

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

interface Data {
  me: {
    thingThisWeek: ThingInterface | null;
  };
}

export default function MePage() {
  const { data, error, loading } = useQuery<Data>(MY_THING_THIS_WEEK);
  const { data: thingInputFormQueryData } = useQuery<{
    thingInputForm: string;
  }>(THING_INPUT_FORM);
  const setThingInputForm = useMutation(SET_THING_INPUT_FORM);
  const submitThing = useMutation(SUBMIT_THING);
  const thingThisWeek = useMemo(() => pluckThingThisWeek(data), [data]);
  const thingInput = useMemo(
    () =>
      thingInputFormQueryData ? thingInputFormQueryData.thingInputForm : '',
    [thingInputFormQueryData]
  );

  function handleFormChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setThingInputForm({
      variables: { text: event.target.value }
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

  return (
    <Page>
      <Title>Me</Title>
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
              <Button.Primary>Complete</Button.Primary>
            )}
          </>
        ) : (
          <>
            <div>
              <textarea
                onChange={handleFormChange}
                value={thingInput}
                data-class-name="thing-input-form"
              />
            </div>
            <Button.Primary
              disabled={thingInput.length === 0}
              onClick={handleSubmitClicked}
            >
              Submit
            </Button.Primary>
          </>
        )}
      </Body>
    </Page>
  );
}

function pluckThingThisWeek(data: Data | undefined): ThingInterface | null {
  if (!data || !data.me) {
    return null;
  }
  return data.me.thingThisWeek;
}
