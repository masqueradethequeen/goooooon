import * as React from "react";
import clsx from "clsx";

import {
  Card, CardContent, Collapse, createStyles, Divider, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel,
  MenuItem, Select, Slider, Switch, TextField, Theme, Typography, withStyles
} from "@material-ui/core";

import {HTF, TF, VTF} from "../../data/const";
import {SceneSettings} from "../../data/Config";
import en from "../../data/en";
import Scene from "../../data/Scene";

const styles = (theme: Theme) => createStyles({
  fullWidth: {
    width: '100%',
  },
  paddingLeft: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
    },
  },
  noPadding: {
    padding: '0 !important',
  },
  endInput: {
    paddingLeft: theme.spacing(1),
    paddingTop: 0,
  },
  percentInput: {
    minWidth: theme.spacing(11),
  },
  expandGrid: {
    maxWidth: '100%',
    width: '100%',
    flexBasis: 'unset',
  },
});

class ZoomMoveCard extends React.Component {
  readonly props: {
    classes: any,
    scene: Scene | SceneSettings,
    onUpdateScene(scene: Scene | SceneSettings, fn: (scene: Scene | SceneSettings) => void): void,
  };

  render() {
    const classes = this.props.classes;

    const enabled = this.props.scene.zoom || this.props.scene.horizTransType != HTF.none || this.props.scene.vertTransType != VTF.none;
    const zoomStart = typeof this.props.scene.zoomStart === 'number' ? this.props.scene.zoomStart : 0;
    const zoomEnd = typeof this.props.scene.zoomEnd === 'number' ? this.props.scene.zoomEnd : 0;
    const horizTransLevel = typeof this.props.scene.horizTransLevel === 'number' ? this.props.scene.horizTransLevel : 0;
    const vertTransLevel = typeof this.props.scene.vertTransLevel === 'number' ? this.props.scene.vertTransLevel : 0;
    const transSinRate = typeof this.props.scene.transSinRate === 'number' ? this.props.scene.transSinRate : 0;
    const transBPMMulti = typeof this.props.scene.transBPMMulti === 'number' ? this.props.scene.transBPMMulti : 0;
    const transDuration = typeof this.props.scene.transDuration === 'number' ? this.props.scene.transDuration : 0;
    const transDurationMin = typeof this.props.scene.transDurationMin === 'number' ? this.props.scene.transDurationMin : 0;
    const transDurationMax = typeof this.props.scene.transDurationMax === 'number' ? this.props.scene.transDurationMax : 0;

    return(
      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch checked={this.props.scene.zoom}
                          onChange={this.onBoolInput.bind(this, 'zoom')}/>
                }
                label="Zoom"/>
              <Collapse in={this.props.scene.zoom} className={classes.fullWidth}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography id="zoom-start-slider">
                      Zoom Start: {zoomStart}x
                    </Typography>
                    <Slider
                      min={1}
                      max={50}
                      value={zoomStart*10}
                      onChange={this.onZoomSliderChange.bind(this, 'zoomStart')}
                      aria-labelledby="zoom-start-slider"/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography id="zoom-end-slider">
                      Zoom End: {zoomEnd}x
                    </Typography>
                    <Slider
                      min={1}
                      max={50}
                      value={zoomEnd*10}
                      onChange={this.onZoomSliderChange.bind(this, 'zoomEnd')}
                      aria-labelledby="zoom-end-slider"/>
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3} className={clsx(classes.paddingTop, this.props.scene.horizTransType == HTF.none && classes.expandGrid)}>
                  <FormControl className={classes.fullWidth}>
                    <InputLabel>Move Horizontally</InputLabel>
                    <Select
                      value={this.props.scene.horizTransType}
                      onChange={this.onInput.bind(this, 'horizTransType')}>
                      {Object.values(HTF).map((tf) =>
                        <MenuItem key={tf} value={tf}>{en.get(tf)}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Collapse in={this.props.scene.horizTransType != HTF.none} className={classes.fullWidth}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs>
                        <Slider
                          min={0}
                          value={horizTransLevel}
                          onChange={this.onSliderChange.bind(this, 'horizTransLevel')}
                          aria-labelledby="horiz-trans-level-slider"/>
                      </Grid>
                      <Grid item xs={3} className={classes.percentInput}>
                        <TextField
                          value={horizTransLevel}
                          margin="dense"
                          onChange={this.onIntInput.bind(this, 'horizTransLevel')}
                          onBlur={this.blurIntKey.bind(this, 'horizTransLevel')}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                          }}
                          inputProps={{
                            className: classes.endInput,
                            step: 5,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'horiz-trans-level-slider',
                          }}/>
                      </Grid>
                    </Grid>
                  </Collapse>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3} className={clsx(classes.paddingTop, this.props.scene.vertTransType == VTF.none && classes.expandGrid)}>
                  <FormControl className={classes.fullWidth}>
                    <InputLabel>Move Vertically</InputLabel>
                    <Select
                      value={this.props.scene.vertTransType}
                      onChange={this.onInput.bind(this, 'vertTransType')}>
                      {Object.values(VTF).map((tf) =>
                        <MenuItem key={tf} value={tf}>{en.get(tf)}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Collapse in={this.props.scene.vertTransType != VTF.none} className={classes.fullWidth}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs>
                        <Slider
                          min={0}
                          value={vertTransLevel}
                          onChange={this.onSliderChange.bind(this, 'vertTransLevel')}
                          aria-labelledby="vert-trans-level-slider"/>
                      </Grid>
                      <Grid item xs={3} className={classes.percentInput}>
                        <TextField
                          value={vertTransLevel}
                          margin="dense"
                          onChange={this.onIntInput.bind(this, 'vertTransLevel')}
                          onBlur={this.blurIntKey.bind(this, 'vertTransLevel')}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                          }}
                          inputProps={{
                            className: classes.endInput,
                            step: 5,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'vert-trans-level-slider',
                          }}/>
                      </Grid>
                    </Grid>
                  </Collapse>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={!enabled && classes.noPadding}>
              <Collapse in={enabled} className={classes.fullWidth}>
                <Divider />
              </Collapse>
            </Grid>
            <Grid item xs={12} className={!enabled && classes.noPadding}>
              <Collapse in={enabled} className={classes.fullWidth}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} className={classes.paddingTop}>
                    <FormControl className={classes.fullWidth}>
                      <InputLabel>Timing</InputLabel>
                      <Select
                        value={this.props.scene.transTF}
                        onChange={this.onInput.bind(this, 'transTF')}>
                        {Object.values(TF).map((tf) =>
                          <MenuItem key={tf} value={tf}>{en.get(tf)}</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Collapse in={this.props.scene.transTF == TF.sin} className={classes.fullWidth}>
                      <Typography id="trans-sin-rate-slider" variant="caption" component="div" color="textSecondary">
                        Wave Rate
                      </Typography>
                      <Grid container alignItems="center">
                        <Grid item xs>
                          <Slider
                            min={1}
                            value={transSinRate}
                            onChange={this.onSliderChange.bind(this, 'transSinRate')}
                            aria-labelledby="trans-sin-rate-slider"/>
                        </Grid>
                        <Grid item xs={3} className={classes.percentInput}>
                          <TextField
                            value={transSinRate}
                            onChange={this.onIntInput.bind(this, 'transSinRate')}
                            onBlur={this.blurIntKey.bind(this, 'transSinRate')}
                            inputProps={{
                              className: classes.endInput,
                              step: 5,
                              min: 0,
                              max: 100,
                              type: 'number',
                              'aria-labelledby': 'trans-sin-rate-slider',
                            }}/>
                        </Grid>
                      </Grid>
                    </Collapse>
                    <Collapse in={this.props.scene.transTF == TF.bpm} className={classes.fullWidth}>
                      <Typography id="trans-bpm-multi-slider" variant="caption" component="div" color="textSecondary">
                        BPM Multiplier {this.props.scene.transBPMMulti > 0 ? this.props.scene.transBPMMulti : "1 / " + (-1 * (this.props.scene.transBPMMulti - 2))}x
                      </Typography>
                      <Slider
                        min={-8}
                        max={10}
                        value={transBPMMulti}
                        onChange={this.onSliderChange.bind(this, 'transBPMMulti')}
                        aria-labelledby="trans-bpm-multi-slider"/>
                    </Collapse>
                    <Collapse in={this.props.scene.transTF == TF.constant} className={classes.fullWidth}>
                      <TextField
                        variant="outlined"
                        label="For"
                        margin="dense"
                        value={transDuration}
                        onChange={this.onIntInput.bind(this, 'transDuration')}
                        onBlur={this.blurIntKey.bind(this, 'transDuration')}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                        }}
                        inputProps={{
                          step: 100,
                          min: 0,
                          type: 'number',
                        }}/>
                    </Collapse>
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
            <Grid item xs={12}  className={!enabled && classes.noPadding}>
              <Collapse in={enabled && (this.props.scene.transTF == TF.random || this.props.scene.transTF == TF.sin)} className={classes.fullWidth}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      label="Between"
                      margin="dense"
                      value={transDurationMin}
                      onChange={this.onIntInput.bind(this, 'transDurationMin')}
                      onBlur={this.blurIntKey.bind(this, 'transDurationMin')}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                      }}
                      inputProps={{
                        step: 100,
                        min: 0,
                        type: 'number',
                      }}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      label="and"
                      margin="dense"
                      value={transDurationMax}
                      onChange={this.onIntInput.bind(this, 'transDurationMax')}
                      onBlur={this.blurIntKey.bind(this, 'transDurationMax')}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                      }}
                      inputProps={{
                        step: 100,
                        min: 0,
                        type: 'number',
                      }}/>
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  blurIntKey(key: string, e: MouseEvent) {
    const min = (e.currentTarget as any).min ? (e.currentTarget as any).min : null;
    const max = (e.currentTarget as any).max ? (e.currentTarget as any).max : null;
    if (min && (this.props.scene as any)[key] < min) {
      this.changeIntKey(key, min);
    } else if (max && (this.props.scene as any)[key] > max) {
      this.changeIntKey(key, max);
    }
  }

  onZoomSliderChange(key: string, e: MouseEvent, value: number) {
    this.changeKey(key, value / 10);
  }

  onSliderChange(key: string, e: MouseEvent, value: number) {
    this.changeKey(key, value);
  }

  onBoolInput(key: string, e: MouseEvent) {
    const input = (e.target as HTMLInputElement);
    const checked = input.checked;
    this.changeKey(key, checked);
  }

  onIntInput(key: string, e: MouseEvent) {
    const input = (e.target as HTMLInputElement);
    this.changeKey(key, input.value === '' ? '' : Number(input.value));
  }

  onInput(key: string, e: MouseEvent) {
    const input = (e.target as HTMLInputElement);
    this.changeKey(key, input.value);
  }

  update(fn: (scene: any) => void) {
    this.props.onUpdateScene(this.props.scene, fn);
  }

  changeIntKey(key:string, intString: string) {
    this.changeKey(key, intString === '' ? '' : Number(intString));
  }

  changeKey(key: string, value: any) {
    this.update((s) => s[key] = value);
  }
}

export default withStyles(styles)(ZoomMoveCard as any);