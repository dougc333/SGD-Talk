<template>
  <div>
    <font-awesome-icon v-if="revision.isApproved()" class="info status-approved" title="approved" :icon="['fas', 'check-circle']" fixed-width/>
    <font-awesome-icon v-else class="info status-not-approved" title="not approved" :icon="['fas', 'ban']" fixed-width/>

    <font-awesome-icon v-if="revision.isExpired()" class="info status-date-due" title="date range is due" :icon="['fas', 'calendar']" fixed-width/>
    <font-awesome-icon v-else class="info status-date-valid " title="date range is valid" :icon="['fas', 'calendar-check']" fixed-width/>

    <font-awesome-icon class="info" :title="`ID ${revision.getID()}`" :icon="['fas', 'hashtag']" fixed-width/>
  </div>
</template>

<script>

export default {
  name: 'RevisionMetadataIcons',
  props: {
    revision: {
      type: Object,
      default: null,
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  cursor: help;
}
.status-approved {
  color: #28a745;
}
.status-not-approved {
  color: #dc3545;
}
.status-date-valid {
  /* color: #28a745; */
  color: #000000;
}
.status-date-due {
  /* color: #ffc107; */
  color: #000000;
}
</style>
