@php
$objHtmlPage = new HtmlPage();
@endphp
<noscript>
    <strong>We're sorry but Mapping Helper doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>

 @if(!$browser_supported)
<h3>
    <i class="fas fa-exclamation-triangle"></i>
    <span>This feature is not available for your browser.</span>
</h3>

@else
<h3>{{$lang['mapping_helper_01']}}</h3>

<div style="max-width:800px;">
    <div id="mapping-helper"></div>
</div>


{{ loadJS('vue/vue-factory/dist/js/app.js') }}
{{ loadJS('vue/mapping-helper/dist/mapping_helper_vue.umd.js') }}


<script>
    window.addEventListener('DOMContentLoaded', function(event) {
        const componentPromise = window.renderVueComponent(mapping_helper_vue, '#mapping-helper')
        /**
        componentPromise.then(component => {
            console.log('Mapping Helper is ready')
        })
        */
    })
</script>
@endif
