<template>
<div>

    <section v-if="!loading">

        <b-toast id="health-check-success-toast" :visible="commands.length==0" auto-hide-delay="5000" variant="success">
            <template #toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">
                    <strong class="mr-auto">Design health check</strong>
                </div>
            </template>
            <div>
                <font-awesome-icon :icon="['fas', 'clipboard-check']" fixed-witdh class="text-success me-1"/>
                <span>All tests successful</span>
            </div>
        </b-toast>



        <b-toast id="health-check-fail-toast" :visible="commands.length>0" no-auto-hide variant="warning">
            <template #toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">
                    <font-awesome-icon :icon="['fas', 'exclamation-circle']" fixed-width class="me-1"/>
                    <strong class="mr-auto">Design mismatch</strong>
                </div>
            </template>
            <div>
                <p>The design of this project could prevent the Data Mart feature from working as intended.</p>
                <!-- Button trigger modal -->
                <b-button @click="showIssuesList" variant="secondary" size="sm">
                    <font-awesome-icon :icon="['fas', 'info-circle']" fixed-width class="me-1"/>
                    <span>Learn more</span>
                </b-button>
            </div>
        </b-toast>

        
    </section>

    <!-- Modal -->
    <b-modal id="designModal" v-model="show" title="Design mismatch" size="lg" no-stacking v-bind="{...modalClose}">
        <div class="modal-body">
            <p @click="actionBeingProcessed=(actionBeingProcessed+1)%(commands.length+1)">The following actions should be performed:</p>
            <div class="table-wrapper">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">description</th>
                            <th scope="col">criticality</th>
                            <th scope="col">action type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(command, index) in commands">
                            <tr :key="index" class="command" :data-id="command.id">
                                <td>{{index+1}}</td>
                                <td><span class="description">{{command.description}}</span></td>
                                <td class="text-center"><b-badge :variant="getCriticalityVariant(command.criticality)">{{command.criticality}}</b-badge></td>
                                <td class="text-center">
                                    <font-awesome-icon :icon="getActionTypeIcon(command.action_type)" fixed-width />
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                
            </div>
            
        </div>

        <template #modal-footer>
            <b-alert :show="projectIsDraftMode" variant="warning" class="mt-0 w-100">
                <span class="font-weight-bold d-block">Please remember that all changes made in "draft mode" must be committed.</span>
            </b-alert>

            <b-alert :show="!userCanFix" variant="info" class="mt-0 w-100">
                <span class="font-weight-bold">
                    <font-awesome-icon :icon="['fas', 'exclamation-circle']" fixed-width class="me-1"/>
                    <span>To fix the design of this project, please ask your administrator to visit this page.</span>
                </span>
            </b-alert>

            <b-alert :show="userCanFix && !projectCanBeModified" variant="info" class="mt-0 w-100">
                <span class="font-weight-bold">
                    <font-awesome-icon :icon="['fas', 'exclamation-circle']" fixed-width class="me-1"/>
                    <span>To fix the design of this project, please enter "draft mode" or move the project to "development" status, then return to this page.</span>
                </span>
            </b-alert>

            <div class="d-flex legend-wrapper">
                <b-card title="Criticality levels">
                    <ul>
                        <li id="legend-action-criticality1"><b-badge :variant="getCriticalityVariant(1)">1</b-badge>: low</li>
                        <li id="legend-action-criticality2"><b-badge :variant="getCriticalityVariant(2)">2</b-badge>: medium</li>
                        <li id="legend-action-criticality3"><b-badge :variant="getCriticalityVariant(3)">3</b-badge>: high</li>
                        <li id="legend-action-criticality4"><b-badge :variant="getCriticalityVariant(4)">4</b-badge>: critical</li>
                    </ul>
                    <b-tooltip target="legend-action-criticality1" triggers="hover" placement="right">The Data Mart will work anyway</b-tooltip> 
                    <b-tooltip target="legend-action-criticality2" triggers="hover" placement="right">Some Data Mart features could not work</b-tooltip> 
                    <b-tooltip target="legend-action-criticality3" triggers="hover" placement="right">Some Data Mart features will not work</b-tooltip> 
                    <b-tooltip target="legend-action-criticality4" triggers="hover" placement="right">The Data Mart will not work</b-tooltip> 
                </b-card>
                <b-card title="Action types" class="ms-2">
                    <ul>
                        <li>
                            <div id="legend-action-automatic">
                                <font-awesome-icon  :icon="['fas', 'magic']" fixed-width /><span>: automatic</span>
                            </div>
                        </li>
                        <li >
                            <div id="legend-action-manual">
                                <font-awesome-icon  :icon="['fas', 'user']" fixed-width /><span>: manual</span> 
                            </div>
                        </li>
                    </ul>
                    <b-tooltip target="legend-action-automatic" triggers="hover" placement="right">the action will be executed automatically by REDCap</b-tooltip> 
                    <b-tooltip target="legend-action-manual" triggers="hover" placement="right">the action must be executed manually by the user</b-tooltip>
                </b-card>
            </div>
            <div class="ml-auto align-self-end">
                <b-button v-if="userCanFix && projectCanBeModified" @click="fixDesign" size="sm" variant="success">
                    <font-awesome-icon v-if="processing" :icon="['fas', 'spinner']" spin fixed-witdh />
                    <font-awesome-icon v-else :icon="['fas', 'wrench']" fixed-width />
                    <span class="ms-1">Fix design</span>
                </b-button>
                <b-button class="ms-2" @click="$bvModal.hide('designModal')" size="sm" :disabled="processing">Close</b-button>
            </div>
        </template>
    </b-modal>

</div>
</template>

<script>

import  {default as Command } from '@/models/Command'

export default {
    components: {  },
    data() {
        return {
            loading: false, // loading settings
            show: false,
            commands: [],
            processed: [],
            processing: false,
        }
    },
    created() {
        this.getDesignInfo()
    },
    computed: {
        selectedCommands: {
            get() { return this.$store.state.settings.selected },
            set(value) {
                let values = [...this.selected]
                const index = values.indexOf(value)
                if(index>=0) values.splice(index, 1)
                else values.push(value)
                console.log(value, values, index)
                this.$store.dispatch('settings/setSelection', values)
            }
        },
        privileges: {
            get() { return this.$store.state.settings.privileges ?? {} },
            set(value) { this.$store.dispatch('settings/setPrivileges', value) },
        },
        project_metadata: {
            get() { return this.$store.state.settings.project_metadata ?? {} },
            set(value) { this.$store.dispatch('settings/setProjectMetadata', value) },
        },
        fixDisabled() {
            return this.selectedCommands.length<1 || this.processing
        },
        userCanFix() {
            return Boolean(this.privileges?.design)
        },
        /**
         * a project can only be modified if in draftMode 
         */
        projectCanBeModified() {
            return this.project_metadata?.can_be_modified ?? false
        },
        projectIsDraftMode() {
            return this.project_metadata?.draft_mode ?? false
        },
        /** set the closing behaviour of the modal based on the processing status */
        modalClose() {
            let noCloseOnBackdrop, noCloseOnEsc, hideHeaderClose
            noCloseOnBackdrop = noCloseOnEsc = hideHeaderClose = this.processing
            return { noCloseOnBackdrop, noCloseOnEsc, hideHeaderClose }
        },
    },
    methods: {
        getCriticalityVariant(level) {
        switch (level) {
                case 1:
                    return 'info'
                case 2:
                    return 'primary'
                case 3:
                    return 'warning'
                case 4:
                    return 'danger'
                default:
                    return 'secondary'
            }
        },
        getActionTypeIcon(action_type) {
            switch (action_type) {
                case 'automatic_action':
                    return ['fas', 'magic']
                case 'manual_action':
                    return ['fas', 'user']
                default:
                    return ['fas', 'question-circle']
            }
        },
        showIssuesList() {
            this.$bvToast.hide('health-check-fail-toast')
            this.$bvModal.show('designModal')
        },
        async getDesignInfo() {
            try {
                this.loading = true
                const response = await this.$API.dispatch('settings/get')
                const {data:{settings={}, commands=[]}} = response
                this.commands = commands.map(params => new Command(params))
                this.privileges = settings?.privileges ?? {}
                this.project_metadata = settings?.project_metadata ?? {}
            } catch (error) {
                console.log(error)
            }finally {
                this.loading = false
            }
        },
        async fixDesign() {
            try {
                this.processing = true
                const response = await this.$API.dispatch('design/fix')
                const {data, data:{error=false}} = response
                if(error) {
                    const {message='error'} = data
                    await this.$bvModal.msgBoxOk(message, {
                        title: 'Error',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'secondary',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                    })
                }else {
                    await this.$bvModal.msgBoxOk('The project design has been updated', {
                        title: 'Confirmation',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                    })
                }
                this.getDesignInfo()

            } catch (error) {
                console.log(error)
            }finally {
                this.$bvModal.hide('designModal')
                this.processing = false
            }
        },
        async notifyAdministrator() {
            const response = await this.$API.dispatch('design/notify')
            const {data} = response
            console.log(data)
        },
        /** process the selected actions in order */
        /* async fixSelected() {
            this.processing = true
            this.processed = []
            const commandsIndexes = [...this.selectedCommands]
            commandsIndexes.sort((a, b) => a - b)

            for(let index of commandsIndexes) {
                let command = this.commands[index]
                if(!command.isReady()) continue
                command.status = status.PROCESSING
                try {
                    const result = await this.sendCommandRequest(command)
                    console.log(result)
                    command.status = status.PROCESSED
                } catch (error) {
                    console.log(error)
                    command.status = status.ERROR
                }
            }
            this.processing = false
        },
        async sendCommandRequest(command) {
            const response = await this.$API.dispatch('design/execute', command)
            const {data} = response
            return data
        }, */
    },
}
</script>

<style scoped>
.table-wrapper {
    max-height: 50vh;
    overflow: auto;
}
table .command .description{
    white-space: pre-line;
}
.legend-wrapper {
    font-size: 14px;
}
.legend-wrapper ul {
    padding: 0;
    list-style-type: none;
}
</style>