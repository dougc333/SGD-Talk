function addScript(url) {
    var header = document.querySelector('head')
    const script = document.createElement('script')
    script.setAttribute('defer', true)
    script.src = url
    header.appendChild(script)
}

function addStyle(url) {
    var header = document.querySelector('head')
    const link = document.createElement('link')
    link.rel="stylesheet"
    link.type="text/css" 
    link.href = url
    header.appendChild(link)
}

async function testParcel() {
    const {Parcel, ParcelBadge} = await import('./lib.js')
    Parcel('#app')

    const badgeContainer = document.createElement('div')
    document.body.appendChild(badgeContainer)
    ParcelBadge(badgeContainer)
}

async function testCdpAdjudicationTable() {
    let params = (new URL(document.location)).searchParams;
    let recordID = params.get('record');
    const {CdpAdjudicationTable} = await import('./lib.js')
    CdpAdjudicationTable('#app', 3)
}

async function testQueueMonitor() {
    const {QueueMonitor} = await import('./lib.js')
    QueueMonitor('#app')
}

async function testEmailUsers() {
    const {EmailUsers} = await import('./lib.js')
    EmailUsers('#app')
}

import { createApp } from 'vue'

const start = async() => {
    const App = await import('./App.vue')
    const app = createApp(App.default).mount('#app')
}

if(process.env.NODE_ENV==='development') {
    // add redcap styles in dev
    addStyle('/redcap/redcap_v999.0.0/Resources/webpack/css/bundle.css')
    addStyle('/redcap_v999.0.0/Resources/webpack/css/bootstrap.min.css')
    addStyle('/redcap/redcap_v999.0.0/Resources/webpack/css/fontawesome/css/all.min.css')
    addScript('/redcap_v999.0.0/Resources/js/Libraries/moment.min.js')
    // testEmailUsers()
    
    // testParcel()
    start()

}