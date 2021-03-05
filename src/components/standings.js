
import {connect} from 'react-redux'
import React, {useEffect} from 'react'
import {get_tournament_data} from '../actions/actions'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './table.css'

const useStyles = makeStyles({
  table: {
    maxWidth: 350,
    backgroundColor: "gray"
  },
});

function blankRows() {
  let rows = []
  for (let i=0; i<8; i++) {
    rows.push({playerName: '', chips: '', position: i+1})
  }
  return rows
}


function createTable(rows, tname, classes) {
    
    return (
        <div class="jss155 jss157">
        <div class="jss154">
            
        <TableContainer component={Paper}>
        <div className="top-span"><span className={classes.table}><center><b>{tname}</b></center></span></div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Position</b></TableCell>
            <TableCell align="center"><b>Player</b></TableCell>
            <TableCell align="center"><b>Chips</b></TableCell>
            <TableCell align="center"><b>Winnings</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.position}>
              <TableCell align="center">
                {row.position}
              </TableCell>
              <TableCell align="center">{row.playerName}</TableCell>
              <TableCell align="center">{row.chips || "eliminated"}</TableCell>
              <TableCell align="center">{!row.prize && row.chips ? "TBD" : row.prize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    )
}

function getChefCatTournament(tourneyData) {
    console.log(tourneyData)
    try {
        let re = new RegExp(/chefcat/,'i')
        const tournamentNames = Object.keys(tourneyData)

        for (let i=0; i<tournamentNames.length; i++) {
            console.log(tournamentNames[i])
            if (tournamentNames[i].match(re)) {
                return {data: tourneyData[tournamentNames[i]], tname: tournamentNames[i]}
            }
        }
        return null
    }
    catch(err) {
        console.log(tourneyData)
        return null
    }


    
}

function Standings(props) {

    useEffect(() => {

      props.getTournamentData()
        try {
            setInterval(async () => {

                props.getTournamentData()
            }, 60000)

        }
        catch(e) {
            console.log(e)
        }
        
    }, [])

    console.log("props.tourndata:")
    console.log(props.tournamentData)
    console.log("/props.tourndata")
    const classes = useStyles();

    


    if(props.tournamentData.isLoading) {
        const blankData = blankRows()
        return (
          <div>{createTable(blankData, "Loading...", classes)}</div>
        )
    }
    else if (props.tournamentData.isError) {
        return (
            <div>props.tournament_data.errorMessage</div>
        )
    }

    else {
        console.log("p")
        const chefcatTournamentData = getChefCatTournament(props.tournamentData.data)
        if(chefcatTournamentData === null) {
            return (
                <div><span>No ChefCat tournaments running.</span></div>
            )
        }
        else {
            
            return (
                <div>{createTable(chefcatTournamentData.data.splice(0,8), chefcatTournamentData.tname, classes)}</div>
            )

        }
        
    }

}

const mapStateToProps = state => ({
    tournamentData: state.tournament_data
  })
  
  const mapDispatchToProps = dispatch => ({
    getTournamentData: () => {
      dispatch(get_tournament_data())
    }
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Standings);