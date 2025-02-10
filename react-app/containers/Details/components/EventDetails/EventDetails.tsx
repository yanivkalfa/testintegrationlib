import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text, TextInput, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState, selectMachalProp} from '../../../../store/store';
import {PrimaryEvent, Selector} from '../../../../config/types';
import {getPrimeEvents} from '../../../../api/eventsApi';
import {styles} from './EventDetails.styles';
import {EventDetailsProps} from '../../Details.types';
import {vault} from '../../../../managers/StorageManager';
import {PRIMARY_EVENTS} from '../../../../config/consts';

const defaultPrimaryEvents = Object.values(PrimaryEvent).map(
  (option, index) => ({
    id: index,
    name: option,
  }),
) as Selector[];

const EventDetails: React.FC<EventDetailsProps> = ({updateMachalProp}) => {
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
        console.error('Error fetching primary events:', error);
      }

      setLoading(false);
    };

    fetchPrimaryEvents();
  }, []);

  return (
    <>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>שייך אירוע ראשי *</Text>
        <Picker
          selectedValue={machalPrimaryEvent?.id}
          onValueChange={(itemValue: number) => {
            const selectedEvent = primaryEvents.find(
              event => event.id === itemValue,
            );
            if (selectedEvent) {
              updateMachalProp('primaryEvent', selectedEvent);
            }
          }}
          style={styles.picker}>
          <Picker.Item label="בחר" value={undefined} />
          {primaryEvents.map(event => (
            <Picker.Item key={event.id} label={event.name} value={event.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>שייך אירוע משני</Text>
        <TextInput
          style={styles.input}
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
