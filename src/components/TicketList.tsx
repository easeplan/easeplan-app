import { Box, Typography, createSvgIcon } from '@mui/material';
import React, { useCallback } from 'react';

type TicketProps = {
  title: string;
  ticketNo: string | number;
  message: string;
  status: string;
  createdAt: Date;
};

const TicketIcon = createSvgIcon(
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" fill="#FFDAAB" />
    <path
      d="M16.6667 5.99996H13.88C13.6 5.22663 12.8667 4.66663 12 4.66663C11.1333 4.66663 10.4 5.22663 10.12 5.99996H7.33333C6.6 5.99996 6 6.59996 6 7.33329V16.6666C6 17.4 6.6 18 7.33333 18H16.6667C17.4 18 18 17.4 18 16.6666V7.33329C18 6.59996 17.4 5.99996 16.6667 5.99996ZM12 5.99996C12.3667 5.99996 12.6667 6.29996 12.6667 6.66663C12.6667 7.03329 12.3667 7.33329 12 7.33329C11.6333 7.33329 11.3333 7.03329 11.3333 6.66663C11.3333 6.29996 11.6333 5.99996 12 5.99996ZM13.3333 15.3333H8.66667V14H13.3333V15.3333ZM15.3333 12.6666H8.66667V11.3333H15.3333V12.6666ZM15.3333 9.99996H8.66667V8.66663H15.3333V9.99996Z"
      fill="#FF9914"
    />
  </svg>,
  'TicketIcon',
);

const TicketIconGrey = createSvgIcon(
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" fill="#ACDAEC" />
    <path
      d="M18.1467 16.0133L19.48 17.3467H20V16.0133H18.1467ZM18.66 14.68L18.6667 8.01332C18.6667 7.27332 18.0667 6.67999 17.3333 6.67999H8.81333L12.3 10.1667C12.42 10.14 12.54 10.12 12.6667 10.1V8.67999L15.3333 11.1667L14.28 12.1467L17.9733 15.84C18.38 15.62 18.66 15.18 18.66 14.68ZM5.59333 5.15332L4.74 5.99999L5.76667 7.02665C5.5 7.26665 5.33333 7.61999 5.33333 8.01332V14.68C5.33333 15.4133 5.92667 16.0133 6.66667 16.0133H4V17.3467H16.0867L17.8933 19.1533L18.74 18.3067L5.59333 5.15332ZM8.66667 14.0133C8.87333 13.0267 9.28 12.0467 10.0467 11.3067L11.1067 12.3667C10.08 12.62 9.30667 13.1533 8.66667 14.0133Z"
      fill="#134153"
    />
  </svg>,
  'TicketIconGrey',
);

function formatTimeTo12Hour(date: Date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid Date object.');
  }

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return formattedTime;
}

function Ticket({ title, ticketNo, message, createdAt, status }: TicketProps) {
  const time = useCallback(() => formatTimeTo12Hour(createdAt), [createdAt]);
  return (
    <Box sx={{ background: '#ECFEF2', padding: '20px', mb: 3 }}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                width: '20px',
                aspectRatio: '1/1',
                mr: '15px',
              }}
            >
              {status === 'unresolved' ? <TicketIcon /> : <TicketIconGrey />}
            </Box>
            <Typography>Ticket {ticketNo}</Typography>
          </Box>
          <Box>
            <Typography> {time()} </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: '1.4rem',
              fontWeight: 'bold',
              my: '.5rem',
            }}
          >
            {title}
          </Typography>
          <Typography>{message}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
export enum TicketType {
  ALL = 'all',
  CLOSED = 'closed',
  ACTIVE = 'active',
}

type TicketListProps = {
  type: TicketType;
};
export default function TicketList({ type }: TicketListProps) {
  const tickets = [
    {
      title: 'Request Refund',
      ticketNo: '#1345 - 3457',
      message: `Lorem ipsum dolor sit amet consectetur. 
        Sit diam neque in vestibulum cursus. Lacinia viverra 
        aenean rhoncus massa fusce eget. In netus diam faucibus 
        quis at purus. Ut id et odio adipiscing risus. Nunc 
        bibendum justo tellus amet malesuada et consequat. 
        Nibh aliquet purus bibendum.`,
      status: 'unresolved',
      createdAt: new Date('2023-04-04'),
    },
    {
      title: 'Request Refund',
      ticketNo: '#1345 - 3456',
      message: `Lorem ipsum dolor sit amet consectetur. 
        Sit diam neque in vestibulum cursus. Lacinia viverra 
        aenean rhoncus massa fusce eget. In netus diam faucibus 
        quis at purus. Ut id et odio adipiscing risus. Nunc 
        bibendum justo tellus amet malesuada et consequat. 
        Nibh aliquet purus bibendum.`,
      status: 'resolved',
      createdAt: new Date(),
    },
  ];

  return (
    <Box
      sx={{
        p: '10px',
      }}
    >
      {tickets.map((ticket, key) => (
        <Ticket {...ticket} key={key} />
      ))}
    </Box>
  );
}
