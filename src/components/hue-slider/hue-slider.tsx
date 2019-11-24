import { Component, Prop, h, State, EventEmitter, Watch, Event } from '@stencil/core';

@Component({
  tag: 'hue-slider',
  styleUrl: 'hue-slider.scss',
  shadow: true
})
export class HueSlider {
  @Prop({reflectToAttr: true, mutable: true}) hue: string = '0';
  @Prop() max: string = '360';

  @State() inputValue: string;
  @State() value: string;

  @Event({eventName: 'input'}) hueInputEvent: EventEmitter;

  handleInput(e) {
    e.stopPropagation()
    const { value } = e.target
    this.hue = value
    this.inputValue = value
    this.hueInputEvent.emit({ value })
  }

  componentWillLoad() {
    this.value = this.hue
  }

  @Watch('hue')
  hueUpdated(newValue) {
    this.value = newValue
  }

  render() {
    return (
      <label class="hue-slider">
        <output style={{ filter: `hue-rotate(${this.hue}deg)` }} class="hue-slider__output">
          <slot></slot>
        </output>
        <input type="range" min="0" max={`${this.max}`} value={`${this.hue}`} onInput={(e) => this.handleInput(e)} />
      </label>
    )
  }
}
