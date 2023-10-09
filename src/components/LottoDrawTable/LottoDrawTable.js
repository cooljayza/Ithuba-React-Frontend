import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.draw_date}</TableCell>
                <TableCell align="right">{row.draw_id}</TableCell>
                <TableCell align="right">{row.sequence_number}</TableCell>
                <TableCell align="right">{row.roll_over_number}</TableCell>
                <TableCell align="right">R{row.next_draw_rollover.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Dividends
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Set</TableCell>
                                        <TableCell>Div</TableCell>
                                        <TableCell align="right">Share Value</TableCell>
                                        <TableCell>No. of Shares</TableCell>
                                        <TableCell align="right">Payout Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.set_dividends.map((setRow) => (
                                        <TableRow key={`${setRow.set}-${setRow.rank}`}>
                                            <TableCell component="th" scope="row">
                                                {setRow.set}
                                            </TableCell>
                                            <TableCell>{setRow.rank}</TableCell>
                                            <TableCell align="right">R{setRow.share_value}</TableCell>
                                            <TableCell align="right">{parseInt(setRow.num_of_shares)}</TableCell>
                                            <TableCell align="right">R{parseFloat(setRow.amount_paid)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        code: PropTypes.number.isRequired,
        draw_id: PropTypes.number.isRequired,
        draw_date: PropTypes.string.isRequired,
        set_dividends: PropTypes.arrayOf(
            PropTypes.shape({
                set: PropTypes.number.isRequired,
                rank: PropTypes.number.isRequired,
                amount_paid: PropTypes.number.isRequired,
                share_value: PropTypes.number.isRequired,
                num_of_shares: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        roll_over_number: PropTypes.number.isRequired,
        next_draw_rollover: PropTypes.number.isRequired,
        sequence_number: PropTypes.number.isRequired,
    }).isRequired,
};
const LottoDrawTable = (props)=>{
    const lottoDraws = props.lottoDraws || []

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Product Name</TableCell>
                        <TableCell align="right">Product Code</TableCell>
                        <TableCell align="right">Draw Date</TableCell>
                        <TableCell align="right">Draw Number</TableCell>
                        <TableCell align="right">CDC</TableCell>
                        <TableCell align="right">Roll Over Number</TableCell>
                        <TableCell align="right">Roll Over AMount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lottoDraws.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default LottoDrawTable