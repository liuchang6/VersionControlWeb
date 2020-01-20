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
      terminalSocket: null
    }
  },
  methods: {
    runRealTerminal () {
      console.log('webSocket is finished')
    },
    errorRealTerminal () {
      console.log('error')
    },
    closeRealTerminal () {
      console.log('close')
    }
  },
  created () {
    let terminalContainer = document.getElementById('terminal')
    this.term = new Terminal(
      {
      rendererType: "canvas", //渲染类型
      cols: 800,
      rows: 600,
      useStyle: true,
      cursorBlink: true, // 光标闪烁
      cursorStyle: "underline", // 光标样式  null | 'block' | 'underline' | 'bar'
      scrollback: 800, //回滚
      tabStopWidth: 8, //制表宽度
      }
    )
    const fitAddon = new FitAddon();
    this.term.open(terminalContainer)
    // open websocket
    var pwd = 'jHdCGHMn+Xs=';
    var password = window.btoa(pwd);
    const terminalSocket = new WebSocket("ws://127.0.0.1:3000/terminals/?host=172.24.8.133&port=3222&user=root&password="+password);
   
    const attachAddon = new AttachAddon(terminalSocket)
    this.term.loadAddon(attachAddon)
    this.term.loadAddon(fitAddon)
    fitAddon.fit();
    this.term._initialized = true
    this.term.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
    this.term.writeln('Type some keys and commands to play around.');
    this.term.writeln('');

  },
  beforeDestroy () {
    this.terminalSocket.close()
    this.term.destroy()
  }}
</script>


<style scoped>

</style>
