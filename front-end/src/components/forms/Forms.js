import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { getPokemon, searchPokemon } from '../../redux/actions/actionPokemon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    textDecoration:'none',
    color:'#ffffff',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Forms = () => {
  const [query, setQuery] = useState('')
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const handleInputChange = (e) => (
    setQuery(e.target.value)
  )

  const onSearch = (query) => {
    history.push(`/search/${query}`)
    dispatch(searchPokemon(query))

  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to='/' className={classes.title}>
            <Typography  variant="h6" noWrap>
              Pokedex
            </Typography>
          </Link>
          <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleInputChange}
            />
            <Button
              contained
              color='primary'
              onClick={
                (e) => {
                  e.preventDefault()
                  onSearch(query)
                }
              }
            >
              <SearchIcon />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Forms