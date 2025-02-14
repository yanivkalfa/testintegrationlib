import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, TextInput, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

import {RootState, selectMachalProp} from '../../../../store/store';
import {PrimaryEvent, Selector} from '../../../../config/types';
import {getPrimeEvents} from '../../../../api/eventsApi';
import {EventDetailsProps} from '../../Details.types';
import {PRIMARY_EVENTS} from '../../../../config/consts';

import {vault} from '../../../../managers/StorageManager';
import {useTheme} from '../../../../theme/hook/useTheme';

const defaultPrimaryEvents = Object.values(PrimaryEvent).map(
  (option, index) => ({
    id: index,
    name: option,
  }),
) as Selector[];

const EventDetails: React.FC<EventDetailsProps> = ({updateMachalProp}) => {
  const globalStyles = useTheme();
  const [primaryEvents, setPrimaryEvents] =
    useState<Selector[]>(defaultPrimaryEvents);
  const [loading, setLoading] = useState<boolean>(true);

  const machalPrimaryEvent = useSelector((state: RootState) =>
    selectMachalProp(state, 'primaryEvent'),
  ) as Selector | undefined;

  const machalSecondaryEvent = useSelector((state: RootState) =>
    selectMachalProp(state, 'secondaryEvent'),
  ) as string;

  useEffect(() => {
    const fetchPrimaryEvents = async () => {
      setLoading(true);
      try {
        const events = await getPrimeEvents();
        setPrimaryEvents(events);
        await vault.set(PRIMARY_EVENTS, events);
      } catch (error) {
        const events = await vault.get(PRIMARY_EVENTS);
        setPrimaryEvents(events || defaultPrimaryEvents);
        console.log('Error fetching primary events:', error);
      }

      setLoading(false);
    };

    fetchPrimaryEvents();
  }, []);

  return (
    <>
      <View style={globalStyles.fieldMargin}>
        <Picker
          style={globalStyles.inputGray}
          selectedValue={machalPrimaryEvent?.id}
          onValueChange={(itemValue: number) => {
            const selectedEvent = primaryEvents.find(
              event => event.id === itemValue,
            );
            if (selectedEvent) {
              updateMachalProp('primaryEvent', selectedEvent);
            }
          }}>
          <Picker.Item label="שייך אירוע ראשי *" value={undefined} />
          {primaryEvents.map(event => (
            <Picker.Item key={event.id} label={event.name} value={event.id} />
          ))}
        </Picker>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>

      <View style={globalStyles.fieldMargin}>
        <TextInput
          style={globalStyles.inputGray}
          value={machalSecondaryEvent}
          onChangeText={text => updateMachalProp('secondaryEvent', text)}
          placeholder="שייך אירוע משני *"
          multiline
        />
      </View>
    </>
  );
};

export default EventDetails;
