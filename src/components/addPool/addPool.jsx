import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Alert } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';
import { colors } from '../../theme'

import Loader from '../loader'

import {
  ERROR,
  CONFIGURE_RETURNED,
  GET_ASSET_INFO,
  GET_ASSET_INFO_RETURNED,
  ADD_POOL,
  ADD_POOL_RETURNED,
  EEEEE_ADDRESS
} from '../../constants'

import Store from "../../stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  inputContainer: {
    display: 'flex',
    padding: '30px',
    borderRadius: '50px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: '40px 0px',
    border: '1px solid '+colors.borderBlue,
    minWidth: '500px',
    background: colors.white
  },
  inputCardHeading: {
    width: '100%',
    color: colors.darkGray,
    paddingLeft: '12px'
  },
  valContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '24px'
  },
  balances: {
    textAlign: 'right',
    paddingRight: '20px',
    cursor: 'pointer'
  },
  assetSelectMenu: {
    padding: '15px 15px 15px 20px',
    minWidth: '300px',
    display: 'flex'
  },
  assetSelectIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    borderRadius: '25px',
    background: '#dedede',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    cursor: 'pointer'
  },
  assetSelectIconName: {
    paddingLeft: '10px',
    display: 'inline-block',
    verticalAlign: 'middle',
    flex: 1
  },
  assetSelectBalance: {
    paddingLeft: '24px'
  },
  assetAdornment: {
    color: colors.text + ' !important'
  },
  assetContainer: {
    minWidth: '120px'
  },
  actionButton: {
    '&:hover': {
      backgroundColor: "#2F80ED",
    },
    marginTop: '24px',
    padding: '12px',
    backgroundColor: "#2F80ED",
    borderRadius: '1rem',
    border: '1px solid #E1E1E1',
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      padding: '15px',
    }
  },
  buttonText: {
    fontWeight: '700',
    color: 'white',
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    background: '#dedede',
    borderRadius: '24px',
    padding: '24px'
  },
  priceHeading: {
    paddingBottom: '12px'
  },
  priceConversion: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  conversionDirection: {
    color: colors.darkGray
  },
  toggleContainer: {
    width: '100%',
    display: 'flex',
  },
  toggleHeading: {
    flex: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '24px',
    color: colors.darkGray
  },
  toggleHeadingActive: {
    flex: 1,
    cursor: 'pointer',
    display: 'flex',
  alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '24px',
    color: colors.text
  },
  flexy: {
    width: '100%',
    display: 'flex'
  },
  label: {
    flex: 1,
    paddingLeft: '12px'
  },
  between: {
    width: '24px'
  },
  portfolioContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '40px'
  },
  titleBalance: {
    padding: '20px 10px',
    borderRadius: '50px',
    border: '1px solid '+colors.borderBlue,
    background: colors.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inline: {
    display: 'flex',
    alignItems: 'baseline'
  },
  symbol: {
    paddingLeft: '6px'
  },
  gray: {
    color: colors.darkGray
  },
  assetInfoContainer: {
    width: '100%',
    background: colors.gray,
    borderRadius: '40px',
    padding: '24px'
  },
  assetInfo: {
    width: '100%',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  assetInfoContainerBase: {
    width: '100%',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  assetLogo: {
    marginRight: '10px'
  },
  assetField: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '12px'
  },
  assetFieldName: {
    display: 'flex',
    flexDirection: 'column',
  },
  poolInfoHeader: {
    width: '100%',
    paddingBottom: '6px',
    paddingTop: '6px'
  },
  cont: {
    marginTop: '12px',
    width: '100%'
  },
  another: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  sepperator: {
    borderBottom: '1px solid #E1E1E1',
    margin: '24px',
  },
  infoAlert: {
    width: '100%',
    marginBottom: '12px',
    backgroundColor: colors.gray,
    '& a': {
      color: 'inherit',
    }
  },
});

class AddPool extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    const pools = store.getStore('pools')
    const basePools = store.getStore('basePools')
    const implementations = store.getStore('implementations')
    const assetTypes = store.getStore('assetTypes')

    const selectedBasePool = basePools && basePools.length > 0 ? basePools[0] : null
    const selectedImplementation = implementations && implementations.length > 0 ? implementations[0] : null
    const selectedAssetType = assetTypes && assetTypes.length > 0 ? assetTypes[0] : null

    this.state = {
      account: store.getStore('account'),
      assetInfo: null,
      basePools: basePools,
      implementations: implementations,
      basePool: selectedBasePool ? selectedBasePool.name : '',
      selectedBasePool: selectedBasePool,
      tokenAddress: '',
      tokenAddressError: false,
      name: '',
      nameError: false,
      symbol: '',
      symbolError: false,
      implementation: selectedImplementation ? selectedImplementation.index : '',
      selectedImplementation: selectedImplementation,
      implementationError: false,
      loading: !(pools && pools.length > 0 && pools[0].assets.length > 0),
      poolTypes: [
        'Plain',
        'Metapool'
      ],
      poolType: 'Plain',
      assetTypes: assetTypes,
      assetType: selectedAssetType ? selectedAssetType.index : '',
      selectedAssetType: selectedAssetType,
      assetTypeError: false,
    }
  }
  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);
    emitter.on(CONFIGURE_RETURNED, this.configureReturned);
    emitter.on(GET_ASSET_INFO_RETURNED, this.getAssetInfoReturned);
    emitter.on(ADD_POOL_RETURNED, this.addPoolReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
    emitter.removeListener(GET_ASSET_INFO_RETURNED, this.getAssetInfoReturned);
    emitter.removeListener(ADD_POOL_RETURNED, this.addPoolReturned);
  };

  configureReturned = () => {
    const pools = store.getStore('pools')

    this.setState({
      account: store.getStore('account'),
      pools: pools,
      loading: false
    })
  };

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account') })
  }

  getAssetInfoReturned = (assetInfo) => {

    if(this.state.tokenAddress === assetInfo.address) {
      this.setState({
        assetInfo: assetInfo,
        loading: false
      })
    } else if(this.state.tokenAddress0 === assetInfo.address) {
      this.setState({
        assetInfo0: assetInfo,
        loading: false
      })
    }  else if(this.state.tokenAddress1 === assetInfo.address) {
        this.setState({
          assetInfo1: assetInfo,
          loading: false
        })
    }  else if(this.state.tokenAddress2 === assetInfo.address) {
        this.setState({
          assetInfo2: assetInfo,
          loading: false
        })
    }  else if(this.state.tokenAddress3 === assetInfo.address) {
        this.setState({
          assetInfo3: assetInfo,
          loading: false
        })
    }
  }

  addPoolReturned = () => {
    this.setState({
      loading: false,
    })
  }

  errorReturned = (error) => {
    this.setState({ loading: false })
  };

  render() {
    const { classes } = this.props;
    const {
      loading,
      account,
      poolType
    } = this.state

    if(!account || !account.address) {
      return (<div></div>)
    }

    return (
      <div className={ classes.root }>
        <div className={ classes.inputContainer }>
          <Typography variant='h2' align='center' className={ classes.poolInfoHeader }>Setup</Typography>
          <Alert icon={false} className={classes.infoAlert}>
            Note: The factory does not support tokens with transfer fees.<br /><a href="https://curve.readthedocs.io/factory-deployer.html#limitations" target="_blank" rel="noopener noreferrer">Read all expected behaviors and limitations</a>
          </Alert>
          { this.renderPoolTypeSelect() }
          { this.renderInput('name') }
          { this.renderInput('symbol') }
          {
            poolType === 'Plain' &&
            <>
              { this.renderAssetTypeSelect() }
              { this.renderAddressInput('tokenAddress0') }
              { this.renderAddressInput('tokenAddress1') }
              { this.renderAddressInput('tokenAddress2') }
              { this.renderAddressInput('tokenAddress3') }
            </>
          }
          {
            poolType === 'Metapool' &&
            <>
              { this.renderAddressInput('tokenAddress') }
              { this.renderBasePoolSelect() }
            </>
          }
          { this.renderImplementationSelect() }
          { this.renderAssetInfo() }
          <Button
            className={ classes.actionButton }
            variant="outlined"
            color="primary"
            disabled={ loading }
            onClick={ this.onAddPool }
            fullWidth
            >
            <Typography className={ classes.buttonText } variant={ 'h4'} color='secondary'>Create Pool</Typography>
          </Button>
        </div>
        { loading && <Loader /> }
      </div>
    )
  };

  renderInput = (id) => {
    const { loading } = this.state
    const { classes } = this.props

    return (
      <div className={ classes.valContainer }>
        <div className={ classes.flexy }>
          <div className={ classes.label }>
            <Typography variant='h4'>{id}</Typography>
          </div>
          <div className={ classes.balances }>
          </div>
        </div>
        <div>
          <TextField
            id={ id }
            name={ id }
            value={ this.state[id] }
            error={ this.state[id+'Error'] }
            onChange={ this.onChange }
            fullWidth
            variant="outlined"
            disabled={ loading }
            className={ classes.actionInput }
          />
        </div>
      </div>
    )
  }

  renderAddressInput = (id) => {
    const { loading, assetType } = this.state
    const { classes } = this.props

    return (
      <div className={ classes.valContainer }>
        <div className={ classes.flexy }>
          <div className={ classes.label }>
            <Typography variant='h4'>token address</Typography>
          </div>
          <div className={ classes.balances }>
          </div>
        </div>
        <div>
          <TextField
            id={ id }
            name={ id }
            value={ this.state[id] }
            error={ this.state[id+'Error'] }
            onChange={ this.onAddressChange }
            fullWidth
            variant="outlined"
            disabled={ loading || (id === 'tokenAddress0' && assetType === 1 ) }
            className={ classes.actionInput }
          />
        </div>
      </div>
    )
  }

  renderBasePoolSelect = () => {
    const { loading, basePools, basePool } = this.state
    const { classes } = this.props

    return (
      <div className={ classes.valContainer }>
        <div className={ classes.flexy }>
          <div className={ classes.label }>
            <Typography variant='h4'>base pool</Typography>
          </div>
          <div className={ classes.balances }>
          </div>
        </div>
        <div>
          <TextField
            id={ 'basePool' }
            name={ 'basePool' }
            select
            value={ basePool }
            onChange={ this.onPoolSelectChange }
            SelectProps={{
              native: false,
              renderValue: (option) => {
                return (
                  <div className={ classes.assetSelectIconName }>
                    <Typography variant='h4'>{ option }</Typography>
                  </div>
                )
              }
            }}
            fullWidth
            variant="outlined"
            disabled={ loading }
            className={ classes.actionInput }
            placeholder={ 'Select' }
          >
            { basePools ? basePools.map((basePool) => { return this.renderPoolOption(basePool) }) : null }
          </TextField>
        </div>
      </div>
    )
  }

  renderPoolOption = (option) => {
    const { classes } = this.props

    return (
      <MenuItem key={option.id} value={option.name} className={ classes.assetSelectMenu }>
        <div className={ classes.assetSelectIconName }>
          <Typography variant='h4'>{ option.name }</Typography>
        </div>
      </MenuItem>
    )
  }

  renderAssetTypeSelect = () => {
    const { loading, assetTypes, assetType } = this.state
    const { classes } = this.props

    return (
      <div className={ classes.valContainer }>
        <div className={ classes.flexy }>
          <div className={ classes.label }>
            <Typography variant='h4'>asset type</Typography>
          </div>
          <div className={ classes.balances }>
          </div>
        </div>
        <div>
          <TextField
            id={ 'assetType' }
            name={ 'assetType' }
            select
            value={ assetType }
            onChange={ this.onAssetTypeSelectChange }
            SelectProps={{
              native: false,
              renderValue: (option) => {

                let theImp = assetTypes ? assetTypes.filter((imp) => {
                  return imp.index === option
                }) : null

                return (
                  <div className={ classes.assetSelectIconName }>
                    <Typography variant='h4'>{ theImp && theImp.length > 0 ? theImp[0].description : '' }</Typography>
                  </div>
                )
              }
            }}
            fullWidth
            variant="outlined"
            disabled={ loading }
            className={ classes.actionInput }
            placeholder={ 'Select' }
          >
            { assetTypes ? assetTypes.map((imp) => { return this.renderAssetTypeOption(imp) }) : null }
          </TextField>
        </div>
      </div>
    )
  }

  renderAssetTypeOption = (option) => {
    const { classes } = this.props

    return (
      <MenuItem key={option.index} value={option.index} className={ classes.assetSelectMenu }>
        <div className={ classes.assetSelectIconName }>
          <Typography variant='h4'>{ option.description }</Typography>
        </div>
      </MenuItem>
    )
  }

  renderImplementationSelect = () => {
    const { loading, implementations, implementation, poolType } = this.state
    const { classes } = this.props

    return (
      <div className={ classes.valContainer }>
        <div className={ classes.flexy }>
          <div className={ classes.label }>
            <Typography variant='h4'>implementation</Typography>
          </div>
          <div className={ classes.balances }>
          </div>
        </div>
        <div>
          <TextField
            id={ 'implementation' }
            name={ 'implementation' }
            select
            value={ implementation }
            onChange={ this.onImplementationSelectChange }
            SelectProps={{
              native: false,
              renderValue: (option) => {

                let theImp = implementations.filter((imp) => {
                  return imp.index === option
                })

                return (
                  <div className={ classes.assetSelectIconName }>
                    <Typography variant='h4'>{ theImp && theImp.length > 0 ? theImp[0].description : '' }</Typography>
                  </div>
                )
              }
            }}
            fullWidth
            variant="outlined"
            disabled={ loading }
            className={ classes.actionInput }
            placeholder={ 'Select' }
          >
            { implementations ? implementations.filter((imp) => {
              if(poolType === 'Metapool') {
                return ['Basic', 'Balances'].includes(imp.description)
              }

              return true
            }).map((imp) => { return this.renderImplementationOption(imp) }) : null }
          </TextField>
        </div>
      </div>
    )
  }

  renderImplementationOption = (option) => {
    const { classes } = this.props

    return (
      <MenuItem key={option.index} value={option.index} className={ classes.assetSelectMenu }>
        <div className={ classes.assetSelectIconName }>
          <Typography variant='h4'>{ option.description }</Typography>
        </div>
      </MenuItem>
    )
  }

  renderPoolTypeSelect = () => {
    const { loading, poolTypes, poolType } = this.state
    const { classes } = this.props

    return (
      <div className={ classes.valContainer }>
        <div className={ classes.flexy }>
          <div className={ classes.label }>
            <Typography variant='h4'>pool type</Typography>
          </div>
          <div className={ classes.balances }>
          </div>
        </div>
        <div>
          <TextField
            id={ 'poolType' }
            name={ 'poolType' }
            select
            value={ poolType }
            onChange={ this.onPoolTypeSelectChange }
            SelectProps={{
              native: false,
              renderValue: (option) => {
                return (
                  <div className={ classes.assetSelectIconName }>
                    <Typography variant='h4'>{ option }</Typography>
                  </div>
                )
              }
            }}
            fullWidth
            variant="outlined"
            disabled={ loading }
            className={ classes.actionInput }
            placeholder={ 'Select' }
          >
            { poolTypes ? poolTypes.map((type) => { return this.renderPoolTypeOption(type) }) : null }
          </TextField>
        </div>
      </div>
    )
  }

  renderPoolTypeOption = (option) => {
    const { classes } = this.props

    return (
      <MenuItem key={option} value={option} className={ classes.assetSelectMenu }>
        <div className={ classes.assetSelectIconName }>
          <Typography variant='h4'>{ option }</Typography>
        </div>
      </MenuItem>
    )
  }

  renderAssetInfo = () => {
    const { assetInfo, selectedBasePool, name, symbol, selectedImplementation, poolType, assetInfo0, assetInfo1, assetInfo2, assetInfo3 } = this.state
    const { classes } = this.props

    /*
    <div className={ classes.assetField }>
      <Typography variant='h3'>{ a }</Typography>
      <Typography variant='h4' className={ classes.gray }>a</Typography>
    </div>
    <div className={ classes.assetField }>
      <Typography variant='h3'>{ fee }%</Typography>
      <Typography variant='h4' className={ classes.gray }>fee</Typography>
    </div>
    */

    return (
      <div className={ classes.cont }>
        <Typography variant='h2' align='center' className={ classes.poolInfoHeader }>Your pool</Typography>
        <div className={ classes.assetInfoContainer }>
          <div className={ classes.assetField }>
            <Typography variant='h3'>{ poolType }</Typography>
            <Typography variant='h4' className={ classes.gray }>type</Typography>
          </div>
          <div className={ classes.assetField }>
            <Typography variant='h3'>{ name }</Typography>
            <Typography variant='h4' className={ classes.gray }>name</Typography>
          </div>
          <div className={ classes.assetField }>
            <Typography variant='h3'>{ symbol }</Typography>
            <Typography variant='h4' className={ classes.gray }>symbol</Typography>
          </div>
          <div className={ classes.assetField }>
            <Typography variant='h3'>{ selectedImplementation.description }</Typography>
            <Typography variant='h4' className={ classes.gray }>implementation</Typography>
          </div>
          <div className={ classes.sepperator }></div>
          {
            poolType === 'Plain' &&
            <>
              { assetInfo0 && this.renderAsset(assetInfo0) }
              <Typography variant='h2' align='center'  className={ classes.poolInfoHeader }>+</Typography>
              { assetInfo1 && this.renderAsset(assetInfo1) }
              <Typography variant='h2' align='center'  className={ classes.poolInfoHeader }>+</Typography>
              { assetInfo2 && this.renderAsset(assetInfo2) }
              <Typography variant='h2' align='center'  className={ classes.poolInfoHeader }>+</Typography>
              { assetInfo3 && this.renderAsset(assetInfo3) }
            </>
          }
          {
            poolType === 'Metapool' &&
            <>
              { assetInfo && this.renderAsset(assetInfo) }
              <Typography variant='h2' align='center'  className={ classes.poolInfoHeader }>+</Typography>
              <div className={ classes.assetInfoContainerBase }>
                { selectedBasePool.assets.map((asset) => {
                  return this.renderAssetBase(asset)
                })}
              </div>
            </>
          }



        </div>
      </div>
    )
  }

  renderAssetBase = (asset) => {
    const { classes } = this.props

    return (
      <div className={ classes.another }>
        <div className={ classes.assetLogo }>
          <img
            alt=""
            src={ this.getLogoForAsset(asset) }
            height="40px"
          />
        </div>
        <div  className={ classes.assetFieldName }>
          <Typography variant='h3'>{ asset.symbol }</Typography>
        </div>
      </div>
    )
  }

  renderAsset = (asset) => {
    const { classes } = this.props

    return (
      <div className={ classes.assetInfo }>
        <div className={ classes.assetLogo }>
          <img
            alt=""
            src={ this.getLogoForAsset(asset) }
            height="40px"
          />
        </div>
        <div  className={ classes.assetFieldName }>
          <Typography variant='h3'>{ asset.name }</Typography>
        </div>
      </div>
    )
  }

  getLogoForAsset = (asset) => {
    try {
      return require('../../assets/tokens/'+asset.symbol+'-logo.png')
    } catch {
      return require('../../assets/tokens/unknown-logo.png')
    }
  }

  startLoading = () => {
    this.setState({ loading: true })
  }

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)
  }

  onAddressChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)

    this.setState({ assetInfo: null })

    if(event.target.value.length === 42) {
      this.setState({ loading: true })
      dispatcher.dispatch({ type: GET_ASSET_INFO, content: { address: event.target.value }})
    }
  }

  onPoolSelectChange = (event) => {
    let val = []
    val[event.target.name] = event.target.value
    this.setState(val)

    const thePool = this.state.basePools.filter((pool) => {
      return pool.name === event.target.value
    })

    //on change pool change assets as well
    this.setState({
      selectedBasePool: thePool[0]
    })
  }

  onAssetTypeSelectChange = (event) => {
    let val = []
    val[event.target.name] = event.target.value
    this.setState(val)

    const theImp = this.state.assetTypes.filter((imp) => {
      return imp.index === event.target.value
    })

    //on change pool change assets as well
    this.setState({
      selectedAssetType: theImp[0]
    })

    if(event.target.value == 1) {
      this.setState({
        tokenAddress0: EEEEE_ADDRESS,
        assetInfo0: {
          address: EEEEE_ADDRESS,
          symbol: 'ETH',
          decimals: 18,
          name: 'Ether',
        }
      })
    }
  }

  onImplementationSelectChange = (event) => {
    let val = []
    val[event.target.name] = event.target.value
    this.setState(val)

    const theImp = this.state.implementations.filter((imp) => {
      return imp.index === event.target.value
    })

    //on change pool change assets as well
    this.setState({
      selectedImplementation: theImp[0]
    })
  }

  onPoolTypeSelectChange = (event) => {
    let val = []
    val[event.target.name] = event.target.value
    this.setState(val)

    if(event.target.value === 'Metapool') {
      this.onImplementationSelectChange({ target: { name: 'implementation', value: 0 } })
    }
  }

  onAddPool = () => {
    this.setState({
      nameError: false,
      symbolError: false,
      implementationError: false,
      tokenAddressError: false,
      tokenAddressError0: false,
      tokenAddressError1: false,
      tokenAddressError2: false,
      tokenAddressError3: false,
      selectedBasePoolError: false
    })

    const {
      tokenAddress,
      tokenAddress0,
      tokenAddress1,
      tokenAddress2,
      tokenAddress3,
      poolType,
      selectedBasePool,
      name,
      symbol,
      selectedImplementation,
      assetType
    } = this.state
    let error = false

    if(!name || name === '') {
      this.setState({ nameError: true })
      error = true
    }

    if(!symbol || symbol === '') {
      this.setState({ symbolError: true })
      error = true
    }

    if(!selectedImplementation || selectedImplementation === '') {
      this.setState({ implementationError: true })
      error = true
    }

    if(poolType === 'Metapool') {
      if(!tokenAddress || tokenAddress === '') {
        this.setState({ tokenAddressError: true })
        error = true
      }

      if(!selectedBasePool || selectedBasePool === '') {
        this.setState({ selectedBasePoolError: true })
        error = true
      }
    } else if (poolType === 'Plain') {
      if(!tokenAddress0 || tokenAddress0 === '') {
        this.setState({ tokenAddress0Error: true })
        error = true
      }
      if(!tokenAddress1 || tokenAddress1 === '') {
        this.setState({ tokenAddress1Error: true })
        error = true
      }
    }


    if(!error) {
      this.setState({ loading: true })
      dispatcher.dispatch({ type: ADD_POOL, content: { poolType, basePool: selectedBasePool, address: tokenAddress, tokenAddress0, tokenAddress1, tokenAddress2, tokenAddress3, name, symbol, implementationIndex: selectedImplementation.index, assetType: assetType } })
    }
  }
}

export default withRouter(withStyles(styles)(AddPool));
