
import {connect} from 'react-redux'
import React, {useEffect} from 'react'
import {get_tournament_data, get_spo_tournament_data} from '../actions/actions'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import SpinningAceOfCorn from './SpinningAceOfCorn';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './table.css'
import {useLocation} from 'react-router-dom'

const useStyles = makeStyles({
  table: {
    maxWidth: 500,
    backgroundColor: "gray"
  },
});

function blankRows() {
  let rows = []
  for (let i=0; i<9; i++) {
    rows.push({playerName: '', chips: '', position: i+1})
  }
  return rows
}


function createTable(rows, tname, remaining, total, props, classes) {
  const tourneyData = props.tournamentData.data


  const tState = tourneyData.tournamentState
 

  if(tState === 'registering') {
    const startDate = new Date(tourneyData.startDate?.$date).toLocaleString()
    const playerInfo = `Players registered: ${tourneyData.players.length}`
    return (
      <div className="tableWrapper">
        <div className="jss155 jss157">
        <div className="jss154">

        <TableContainer  component={Paper} style={{border:3,borderStyle:'solid', borderColor:'white'}}>
        <div className="top-span"><span className={classes.table}><center><b>{tname} - Registering</b></center></span></div>  
      <Table className={classes.table} aria-label="simple table">
      
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>{tname}</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="center">
                Starting at: {startDate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                {playerInfo}
              </TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </div>
    )

  }
    
    return (
      <div className="tableWrapper">
        <div className="jss155 jss157">
        <div className="jss154">

        <TableContainer  component={Paper} style={{border:3,borderStyle:'solid', borderColor:'white'}}>
        <div className="top-span"><span className={classes.table}><center><b>{tname} - {remaining}/{total} players</b></center></span></div>  
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
              <TableCell align="center">{row.chips || "Eliminated"}</TableCell>
              <TableCell align="center">{!row.prize1 && row.chips ? "TBD" : row.totalPrize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </div>
    )
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function StandingsTable(props) {
    const query = useQuery()
    const {uid,tstate} = props




    useEffect(() => {

      props.getTournamentData(uid,tstate)
        try {
            setInterval(async () => {

                props.getTournamentData(uid,tstate)
            }, 30000)

        }
        catch(e) {

        }
        
    }, [])
    const classes = useStyles();

    


    if(props.tournamentData.isLoading) {
        return (
          <SpinningAceOfCorn/>
        )
    }
    else if (props.tournamentData.isError) {
        return (
            <div>An error occurred while loading the table.  Try refreshing.</div>
        )
    }

    else {
      const {data} = props.tournamentData
      if(typeof data !== "undefined" && 
        data !== null &&
        data.hasOwnProperty('players')) {
          
        const {players, tournamentName } = data
        const total = players.length
        const remaining = players.filter(player => player.chips > 0)
        return (
        <div>
         {createTable(players.splice(0,9), tournamentName, remaining.length, total, props, classes)}
         </div>
        )

      }
      else {
            return (
              <div className="tableWrapper">
              <div className="jss155 jss157">
              <div className="jss154"></div>
              <TableContainer  component={Paper} style={{border:3,borderStyle:'solid', borderColor:'white'}}>
              <Table>
              <div className="top-span"><span className={classes.table}><center><b>Tournament not running</b></center></span></div>
              <TableRow><div className="lower-span" colspan="4">Go to <a style={{color:'white'}} href="https://cornblaster.com">cornblaster.com</a> to find a running tournament.</div></TableRow>
              </Table>
              </TableContainer>
              </div></div>
            )
      }

      }
        
    

}

const mapStateToProps = state => ({
    tournamentData: state.tournament_data
  })
  
  const mapDispatchToProps = dispatch => ({
    getTournamentData: (uid,tstate) => {
      dispatch(get_tournament_data(uid,tstate))
    }
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(StandingsTable);