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

export default function BasicTable({ data }: any) {
  return (
    <TableContainer
      component={Paper}
      sx={{ border: 'solid 1px #ccc', px: '1rem', pb: '1rem' }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: '800', color: 'primary.main' }}>
              Budget
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
              State
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: '800', color: 'primary.main' }}
            >
              City
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: '800', color: 'primary.main' }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row: any) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ fontWeight: '700', color: 'primary.main' }}
              >
                <small>₦</small> {formatCurrency(row?.budget)}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: '700', color: 'secondary.main' }}
              >
                <Link href={`/account/contracts/${row?._id}`}>
                  <Button
                    sx={{ fontSize: '1rem', textTransform: 'capitalize' }}
                  >
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
