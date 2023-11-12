import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { AnyNsRecord } from 'dns';
import Link from 'next/link';
import { formatCurrency } from '@/utils';

export default function TransactionTable({ data }: any) {
  return (
    <TableContainer component={Paper} sx={{ px: '1rem', pb: '1rem' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: '800', color: 'primary.main' }}>
              Amount
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: '800', color: 'primary.main' }}
            >
              Date
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: '800', color: 'primary.main' }}
            >
              Status
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: '800', color: 'primary.main' }}
            >
              Type
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 3, 4, 5, 5, 6]?.map((row: any, i: any) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">34,000</TableCell>
              <TableCell align="right">34,000</TableCell>
              <TableCell align="right">34,000</TableCell>
              <TableCell align="right">34,000</TableCell>
              <TableCell align="right">34,000</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
