export default {
    actions: {


        /**
         * get the revisions list
         * 
         */
        getUser({api_client}) {
            var params = {
                route: 'DataMartController:getUser',
            }
            return api_client.get('',{params})
        },

        /**
         * get the revisions list
         * 
         */
        getSettings({api_client}) {
            var params = {
                route: 'DataMartController:getSettings',
            }
            return api_client.get('',{params})
        },

        /**
         * get the revisions list
         */
        getRevisions({api_client}) {
            var params = {
                route: 'DataMartController:revisions'
            }
            return api_client.get('',{params})
            // return this.ajaxRequest(url, 'GET', {});
        },

        /**
         * get sourceFields
         */
        getSourceFields({api_client}) {
            var params = {
                route: 'DataMartController:sourceFields'
            }
            return api_client.get('',{
                params,
                responseType: 'text',
            })
        },

        /**
         * add a revision on the database
         */
        addRevision({api_client}, post_params={}) {
            var params = {
                route: 'DataMartController:addRevision'
            }
            return api_client.post('', post_params, {params})
        },
        /**
         * add a revision on the database
         */
        runRevision({api_client}, revision_id, mrn, options={}) {
            mrn = mrn ?? '' // convert null or undefined to empty string
            let {background=false, send_feedback=false} = options
            var params = {
                route: 'DataMartController:runRevision',
            }
            const post_params = {
                revision_id,
                mrn,
                background,
                send_feedback,
            }
            // const source = CancelToken.source()
            const request = api_client.post('', post_params, {
                params,
                // cancelToken: source.token
            })
            // modify the promise adding the cancel token
            // request.cancelToken = source
            return request
        },

        /**
         * approve a revision
         */
        approveRevision({api_client}, post_params={}) {
            var params = {
                route: 'DataMartController:approveRevision'
            }
            return api_client.post('', post_params, {params})
        },

        /**
         * import a revision
         * @param {FormData} data 
         */
        importRevision({api_client}, data={}) {
            var params = {
                route: 'DataMartController:importRevision',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const post_params = data
            return api_client.post('', post_params, {params}/* {processData: false, contentType: false,} */)
        },

        /**
         * delete a revision
         */
        deleteRevision({api_client}, data={}) {
            var params = {
                route: 'DataMartController:deleteRevision'
            }
            return api_client.delete('', {data, params})
        },

        searchMrns({api_client}, {query, start=0, limit=10})
        {
            var params = {
                route: 'DataMartController:searchMrns',
                headers: { 'Content-Type': 'multipart/form-data' },
                query,
                start,
                limit,
            }
            return api_client.get('',{
                params,
            })
        },

    }
}