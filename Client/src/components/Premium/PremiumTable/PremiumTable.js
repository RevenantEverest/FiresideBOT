import React from 'react';
import { makeStyles, useTheme } from '@fluentui/react-theme-provider';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody
} from 'mdbreact';
import services from './_TableData';

function PremiumTable() {

    const theme = useTheme();
    const styles = useStyles();

    const { rows, columns } = services.generateTableData(theme);

    return(
        <MDBTable className={"text-center " + styles.table} responsive borderless>
            <MDBTableHead columns={columns} />
            <MDBTableBody rows={rows} />
        </MDBTable>
    );
};

const useStyles = makeStyles((theme) => ({
    table: {
        '>thead': {
            '>tr': {
                '>th': {
                    fontWeight: "700 !important",
                    fontSize: "20px !important",
                    color: theme.colors.text
                }
        
            }
    
        },
        '>tbody': {
            '>tr': {
                '>td:first-child': {
                    textAlign: "left"
                },
                '>td': {
                    fontWeight: "500 !important",
                    fontSize: "16px !important",
                    color: theme.colors.text
                    
                }
        
            }
        }
    }
}));

export default PremiumTable;