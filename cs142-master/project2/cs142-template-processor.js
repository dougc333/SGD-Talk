
'use strict';

function Cs142TemplateProcessor(my_template){
    this.template = my_template;
}

Cs142TemplateProcessor.prototype.fillIn=function(my_dict){
    let process_me = this.template;
    Object.keys(my_dict).forEach(function(key) {
      process_me = process_me.replace('{{'+key+'}}',my_dict[key]);
    });
    let test_match = process_me.match(/{{[^}]*}}/g);
    if (test_match !==null){
        let clean_me = "";
        for (let i=0;i<test_match.length;i++){
            clean_me = process_me.replace(test_match[i],"");
        }
        return clean_me;
    }
    return process_me;
};

