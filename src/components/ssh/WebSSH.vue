<template>
  <div class="container">
  </div>
</template>

<script>

import 'xterm/css/xterm.css'
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';
export default {
  name: 'Console',
  data () {
    return {
      term: null,
      terminalSocket: null,
      serverid: this.$store.state.serverid,
    }
  },
  created () {
    console.log(this.serverid);
    
    let terminalContainer = document.getElementById('terminal')
    this.term = new Terminal(
      {
      convertEol: true,
      cols: 1300,
      rows: 600,
      useStyle: true,
      cursorBlink: true, // 光标闪烁
      cursorStyle: "underline", // 光标样式  null | 'block' | 'underline' | 'bar'
      scrollback: 800, //回滚
      tabStopWidth: 4, //制表宽度
      }
    )
    const fitAddon = new FitAddon();
    this.term.open(terminalContainer)
    // open websocket
    var pwd = 'Liu7792049';
    var password = window.btoa(pwd);
    const terminalSocket = new WebSocket("ws://127.0.0.1:3000/terminals/?host=49.235.71.24&port=22&user=root&password="+password);
    const attachAddon = new AttachAddon(terminalSocket)
    this.term.loadAddon(attachAddon)
    this.term.loadAddon(fitAddon)
    fitAddon.fit();
    this.term.focus();
    this.term._initialized = true
    
  },
  beforeDestroy () {
    this.terminalSocket.close()
    this.term.destroy()
  }}
</script>


<style scoped>

</style>
