<svg width="1000" height="1000" viewBox="-300 -300 600 600" xmlns="http://www.w3.org/2000/svg">

  <rect x="-300" y="-300" width="1000" height="1000" fill="#b4cb6b"/>
  <slot></slot>
</svg>

<style>
  svg {
    position: absolute;
    top: 45px;
    width: 100vw;
    height: 100vw;
    z-index: -1;
  }
</style>