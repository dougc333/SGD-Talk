<template>
  <div >
    <ul>
      <li><a href="#" @click.prevent="launch('parcel')">Test Parcel</a></li>
      <li><a href="#" @click.prevent="launch('queue-monitor')">Test Queue Monitor</a></li>
      <li><a href="#" @click.prevent="launch('email-users')">Test Email Users</a></li>
      <li><a href="#" @click.prevent="launch('web-worker')">Test Web Worker</a></li>
    </ul>
    <div ref="containerRef"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let unmount
const containerRef = ref()

const initTarget = () => {
  const parent = containerRef.value
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  const target = document.createElement('div')
  containerRef.value.appendChild(target)
  return target
}

const launch = (key) => {
  if(typeof unmount === 'function') {
    unmount()
    unmount = null
  }
  const target = initTarget()
  switch (key) {
    case 'parcel':
      testParcel(target)
      break;
    case 'queue-monitor':
      testQueueMonitor(target)
      break;
    case 'email-users':
      testEmailUsers(target)
      break;
    case 'web-worker':
      testWebWorker(target)
      break;
    default:
      break;
  }
}

async function testParcel(target) {
    const {Parcel, ParcelBadge} = await import('./lib.js')
    
    const parcelApp = await Parcel(target)

    const badgeContainer = document.createElement('div')
    document.body.appendChild(badgeContainer)
    const badgeApp = await ParcelBadge(badgeContainer)

    unmount = () => {
      badgeApp.unmount()
      parcelApp.unmount()
    }
}

async function testCdpAdjudicationTable() {
    let params = (new URL(document.location)).searchParams;
    let recordID = params.get('record');
    const {CdpAdjudicationTable} = await import('./lib.js')
    CdpAdjudicationTable(target, 3)
}

async function testWebWorker(target) {
  const WebWorker = await import('./base-app/index')

  const app = WebWorker?.default(target)
  unmount = () => app.unmount
}

async function testQueueMonitor(target) {
    const {QueueMonitor} = await import('./lib.js')
    const app = QueueMonitor(target)
    unmount = () => app.unmount
}

async function testEmailUsers(target) {
    const {EmailUsers} = await import('./lib.js')
    const app = EmailUsers(target)
    unmount = () => app.unmount
}

</script>

<style scoped>

</style>
