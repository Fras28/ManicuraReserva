import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Input,
  Select,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const DateTimePicker = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Admin panel state
  const [adminDate, setAdminDate] = useState('');
  const [availableHours, setAvailableHours] = useState({
    '09:00': false, '10:00': false, '11:00': false, '12:00': false,
    '13:00': false, '14:00': false, '15:00': false, '16:00': false,
    '17:00': false, '18:00': false,
  });

  const handleDateSelect = useCallback((slotInfo) => {
    setSelectedDate(slotInfo.start);
    setSelectedTime(null);
  }, []);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const toggleAvailableHour = (hour) => {
    setAvailableHours(prev => ({...prev, [hour]: !prev[hour]}));
  };

  const addAvailability = () => {
    if (adminDate) {
      const newEvents = Object.entries(availableHours)
        .filter(([_, isAvailable]) => isAvailable)
        .map(([hour, _]) => ({
          start: new Date(`${adminDate}T${hour}`),
          end: new Date(`${adminDate}T${hour}`),
          title: 'Available',
        }));
      
      setEvents(prev => [...prev, ...newEvents]);
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#3174ad',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style
    };
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectSlot={handleDateSelect}
          selectable
          eventPropGetter={eventStyleGetter}
        />
        {selectedDate && (
          <Select placeholder="Select time" onChange={(e) => handleTimeSelect(e.target.value)} value={selectedTime || ''}>
            {events
              .filter(event => moment(event.start).isSame(selectedDate, 'day'))
              .map((event, index) => (
                <option key={index} value={moment(event.start).format('HH:mm')}>
                  {moment(event.start).format('HH:mm')}
                </option>
              ))}
          </Select>
        )}
        <Button onClick={onOpen}>Open Admin Panel</Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Admin Panel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                type="date"
                value={adminDate}
                onChange={(e) => setAdminDate(e.target.value)}
              />
              <Text fontWeight="bold">Available Hours:</Text>
              <VStack align="start">
                {Object.entries(availableHours).map(([hour, isAvailable]) => (
                  <Checkbox
                    key={hour}
                    isChecked={isAvailable}
                    onChange={() => toggleAvailableHour(hour)}
                  >
                    {hour}
                  </Checkbox>
                ))}
              </VStack>
              <Button onClick={addAvailability}>Add Availability</Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DateTimePicker;