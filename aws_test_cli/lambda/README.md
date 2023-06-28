https://github.com/Ircama/aws-lambda-reverse-proxy/blob/main/lambda_function.py

convention: folder/file name/function name

code: lambda.Code_from_asset("folder_name")
handler="file_name.fn_name"

handler='handler.handle' means file name is handler.ts or handler.py and there
is fn def handle(event,context) or function(event,context) is file
handler.ts/handler.py

there are 2 sdk for lambda fn, 1) SAM init and CDK init. both create project tempalates. SAM
has template.yaml. 

SAM uses a docker container vs. cdk deploys directly to AWS. 
SAM/docker allows testing locally. Can test cdk locally also using jest and
local fns. 

Does SAM project have advantages for more complete stacks? testing locally with
dynamodb. 



